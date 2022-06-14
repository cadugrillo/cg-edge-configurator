package containers

import (
	"context"
	"fmt"
	"io"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
)

var (
	ContainerListOptions   types.ContainerListOptions
	ContainerRemoveOptions types.ContainerRemoveOptions
	ContainerConfig        container.Config
	NetworkConfig          network.NetworkingConfig
	HostConfig             container.HostConfig
)

func GetContainers() []types.Container {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	ContainerListOptions.All = true
	containers, err := cli.ContainerList(ctx, ContainerListOptions)
	if err != nil {
		panic(err)
	}

	for _, container := range containers {
		fmt.Println(container.ID)
	}
	return containers
}

func InstallContainer() string {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	imageName := "bfirsh/reticulate-splines"

	out, err := cli.ImagePull(ctx, imageName, types.ImagePullOptions{})
	if err != nil {
		panic(err)
	}
	defer out.Close()
	io.Copy(os.Stdout, out)

	ContainerConfig.Image = imageName
	ContainerConfig.Hostname = ""
	ContainerConfig.Volumes = map[string]struct{}{}

	NetworkConfig.EndpointsConfig = map[string]*network.EndpointSettings{"cg-edge": {}}

	HostConfig.Binds = []string{}
	HostConfig.RestartPolicy.Name = "always"
	HostConfig.PortBindings = nat.PortMap{}

	resp, err := cli.ContainerCreate(ctx, &ContainerConfig, &HostConfig, &NetworkConfig, nil, "containerName")
	if err != nil {
		panic(err)
	}

	if err := cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		panic(err)
	}

	fmt.Println(resp.ID)
	return resp.ID
}

func StartContainer(Id string) string {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	fmt.Print("Starting container ", Id[:10], "... ")
	if err := cli.ContainerStart(ctx, Id, types.ContainerStartOptions{}); err != nil {
		panic(err)
	}
	fmt.Println("Success")
	return "App successfully started"
}

func StopContainer(Id string) string {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	fmt.Print("Stopping container ", Id[:10], "... ")
	if err := cli.ContainerStop(ctx, Id, nil); err != nil {
		panic(err)
	}
	fmt.Println("Success")
	return "App successfully stopped"
}

func RestartContainer(Id string) string {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	fmt.Print("Restarting container ", Id[:10], "... ")
	if err := cli.ContainerRestart(ctx, Id, nil); err != nil {
		panic(err)
	}
	fmt.Println("Success")
	return "App successfully restarted"
}

func RemoveContainer(Id string) string {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	ContainerRemoveOptions.Force = true
	ContainerRemoveOptions.RemoveVolumes = true

	fmt.Print("Removing container ", Id[:10], "... ")
	if err := cli.ContainerRemove(ctx, Id, ContainerRemoveOptions); err != nil {
		panic(err)
	}
	fmt.Println("Success")
	return "App successfully removed"
}

func Logs(Id string) string {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	options := types.ContainerLogsOptions{ShowStdout: true}
	out, err := cli.ContainerLogs(ctx, Id, options)
	if err != nil {
		panic(err)
	}

	if b, err := io.ReadAll(out); err == nil {
		return string(b)
	}
	//io.Copy(os.Stdout, out)
	return "no text to show"
}

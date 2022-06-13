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
)

var (
	ContainerListOptions   types.ContainerListOptions
	ContainerRemoveOptions types.ContainerRemoveOptions
	ContainerConfig        container.Config
	NetworkConfig          network.NetworkingConfig
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
	resp, err := cli.ContainerCreate(ctx, &ContainerConfig, nil, nil, nil, "containerName")
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

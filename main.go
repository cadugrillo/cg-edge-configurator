package main

import (
	"cg-edge-configurator/handlers"
	"os"
	"path"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(CORSMiddleware())

	r.NoRoute(func(c *gin.Context) {
		dir, file := path.Split(c.Request.RequestURI)
		ext := filepath.Ext(file)
		if file == "" || ext == "" {
			c.File("./ui/dist/ui/index.html")
		} else {
			c.File("./ui/dist/ui/" + path.Join(dir, file))
		}
	})

	r.GET("/config/:appName", handlers.GetConfigHandler)
	r.POST("/config/:appName", handlers.SetConfigHandler)
	r.GET("/users/json", handlers.GetUsersHandler)
	r.POST("/users/json", handlers.UpdateUserHandler)
	r.GET("/users/add", handlers.AddUserHandler)
	r.POST("/users/:Id", handlers.DeleteUserHandler)
	r.POST("/users/validate", handlers.ValidateUserHandler)
	r.GET("/system/hostnetwork", handlers.GetNetworkInfoHandler)
	r.GET("/system/hoststats", handlers.GetHostStatsHandler)
	r.POST("/system/hostnetwork", handlers.SetNetworkInfoHandler)
	r.POST("/system/restart", handlers.RestartHostHandler)
	r.POST("/system/shutdown", handlers.ShutDownHostHandler)
	r.GET("/containers/json", handlers.GetContainersHandler)
	r.GET("/containers/repository", handlers.GetAppRepositoryHandler)
	r.GET("/containers/info", handlers.GetDockerServerInfoHandler)
	r.GET("/containers/:Id/logs", handlers.GetLogsHandler)
	r.POST("/containers/install", handlers.InstallContainerHandler)
	r.POST("/containers/:Id/start", handlers.StartContainerHandler)
	r.POST("/containers/:Id/stop", handlers.StopContainerHandler)
	r.POST("/containers/:Id/restart", handlers.RestartContainerHandler)
	r.POST("/containers/:Id/remove", handlers.RemoveContainerHandler)
	r.GET("/images/json", handlers.GetImagesHandler)
	r.POST("/images/:Id/remove", handlers.RemoveImageHandler)
	r.GET("/volumes/json", handlers.GetVolumesHandler)
	r.POST("/volumes/:Id/remove", handlers.RemoveVolumeHandler)
	r.GET("/networks/json", handlers.GetNetworksHandler)
	r.POST("/networks/:Id/create", handlers.CreateNetworkHandler)
	r.POST("/networks/:Id/remove", handlers.RemoveNetworkHandler)

	httpPort := os.Getenv("HTTP_PORT")
	if httpPort == "" {
		httpPort = "4343"
	}

	err := r.Run(":" + httpPort)
	if err != nil {
		panic(err)
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "DELETE, GET, OPTIONS, POST, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

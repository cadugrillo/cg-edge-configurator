package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	apps_repository "cg-edge-configurator/apps-repository"
	mqttcloudconfig "cg-edge-configurator/apps/mqtt-cloud-connector/config"
	opcuaconfig "cg-edge-configurator/apps/opcua-mqtt-connector/config"
	"cg-edge-configurator/configurator"
	"cg-edge-configurator/containers"
	"cg-edge-configurator/system"

	"github.com/gin-gonic/gin"
)

func GetConfigHandler(c *gin.Context) {
	appName := c.Param("appName")
	switch appName {
	case "mqtt-cloud-connector":
		c.JSON(http.StatusOK, configurator.GetMccConfig())
		return
	case "opcua-mqtt-connector":
		c.JSON(http.StatusOK, configurator.GetOpcuaConfig())
		return
	}
	c.JSON(http.StatusBadRequest, "App not found")
}

func SetConfigHandler(c *gin.Context) {
	appName := c.Param("appName")
	switch appName {
	case "mqtt-cloud-connector":
		configFile, statusCode, err := convertHTTPBodyMccConfig(c.Request.Body)
		if err != nil {
			c.JSON(statusCode, err)
			return
		}
		c.JSON(statusCode, configurator.SetMccConfig(configFile))
		return
	case "opcua-mqtt-connector":
		configFile, statusCode, err := convertHTTPBodyOpcuaConfig(c.Request.Body)
		if err != nil {
			c.JSON(statusCode, err)
			return
		}
		c.JSON(statusCode, configurator.SetOpcuaConfig(configFile))
		return
	}
	c.JSON(http.StatusBadRequest, "App not found")
}

func GetContainersHandler(c *gin.Context) {
	c.JSON(http.StatusOK, containers.GetContainers())
}

func GetAppRepositoryHandler(c *gin.Context) {
	c.JSON(http.StatusOK, apps_repository.GetApps())
}

func InstallContainerHandler(c *gin.Context) {
	AppTemplate, statusCode, err := convertHTTPBodyAppTemplate(c.Request.Body)
	if err != nil {
		c.JSON(statusCode, err)
		return
	}
	c.JSON(http.StatusOK, containers.InstallContainer(AppTemplate))
}

func StartContainerHandler(c *gin.Context) {
	Id := c.Param("Id")
	c.JSON(http.StatusOK, containers.StartContainer(Id))
}

func StopContainerHandler(c *gin.Context) {
	Id := c.Param("Id")
	c.JSON(http.StatusOK, containers.StopContainer(Id))
}

func RestartContainerHandler(c *gin.Context) {
	Id := c.Param("Id")
	c.JSON(http.StatusOK, containers.RestartContainer(Id))
}

func RemoveContainerHandler(c *gin.Context) {
	Id := c.Param("Id")
	c.JSON(http.StatusOK, containers.RemoveContainer(Id))
}

func GetLogsHandler(c *gin.Context) {
	Id := c.Param("Id")
	c.JSON(http.StatusOK, containers.Logs(Id))
}

func GetDockerServerInfoHandler(c *gin.Context) {
	c.JSON(http.StatusOK, containers.GetDockerServerInfo())
}

//////////////SYSTEM HANDLERS////////////////////
func GetNetworkInfoHandler(c *gin.Context) {
	c.JSON(http.StatusOK, system.GetNetworkInfo())
}

func SetNetworkInfoHandler(c *gin.Context) {
	InterfaceSet, statusCode, err := convertHTTPBodyInterfaceSet(c.Request.Body)
	if err != nil {
		c.JSON(statusCode, err)
		return
	}
	c.JSON(http.StatusOK, system.SetNetworkInfo(InterfaceSet))
}

func RestartHostHandler(c *gin.Context) {
	c.JSON(http.StatusOK, system.RestartHost())
}

///////////////CONVERSIONs OF HTTP BODY TO SPECIFIC STRUCTURES////////////////////////////

func convertHTTPBodyMccConfig(httpBody io.ReadCloser) (mqttcloudconfig.Config, int, error) {
	body, err := ioutil.ReadAll(httpBody)
	if err != nil {
		return mqttcloudconfig.Config{}, http.StatusInternalServerError, err
	}
	defer httpBody.Close()
	var Config mqttcloudconfig.Config
	err = json.Unmarshal(body, &Config)
	if err != nil {
		return mqttcloudconfig.Config{}, http.StatusBadRequest, err
	}
	return Config, http.StatusOK, nil
}

func convertHTTPBodyOpcuaConfig(httpBody io.ReadCloser) (opcuaconfig.Config, int, error) {
	body, err := ioutil.ReadAll(httpBody)
	if err != nil {
		return opcuaconfig.Config{}, http.StatusInternalServerError, err
	}
	defer httpBody.Close()
	var Config opcuaconfig.Config
	err = json.Unmarshal(body, &Config)
	if err != nil {
		return opcuaconfig.Config{}, http.StatusBadRequest, err
	}
	return Config, http.StatusOK, nil
}

func convertHTTPBodyAppTemplate(httpBody io.ReadCloser) (apps_repository.Template, int, error) {
	body, err := ioutil.ReadAll(httpBody)
	if err != nil {
		return apps_repository.Template{}, http.StatusInternalServerError, err
	}
	defer httpBody.Close()
	var AppTemplate apps_repository.Template
	err = json.Unmarshal(body, &AppTemplate)
	if err != nil {
		return apps_repository.Template{}, http.StatusBadRequest, err
	}
	return AppTemplate, http.StatusOK, nil
}

func convertHTTPBodyInterfaceSet(httpBody io.ReadCloser) (system.InterfaceSet, int, error) {
	body, err := ioutil.ReadAll(httpBody)
	if err != nil {
		fmt.Println("error 1")
		return system.InterfaceSet{}, http.StatusInternalServerError, err
	}
	defer httpBody.Close()
	var InterfaceSet system.InterfaceSet
	err = json.Unmarshal(body, &InterfaceSet)
	if err != nil {
		fmt.Println("error 2")
		return system.InterfaceSet{}, http.StatusBadRequest, err
	}
	return InterfaceSet, http.StatusOK, nil
}

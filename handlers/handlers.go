package handlers

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"

	mqttcloudconfig "cg-edge-configurator/apps/mqtt-cloud-connector/config"
	opcuaconfig "cg-edge-configurator/apps/opcua-mqtt-connector/config"
	"cg-edge-configurator/configurator"

	"github.com/gin-gonic/gin"
)

// GetTodoListHandler returns all current todo items
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

// AddTodoHandler adds a new todo to the todo list
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

func DeleteConfigHandler(c *gin.Context) {

}

func PutConfigHandler(c *gin.Context) {

}

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

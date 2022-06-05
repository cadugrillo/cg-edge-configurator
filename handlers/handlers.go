package handlers

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"

	mqttcloudconfig "cg-edge-configurator/apps/mqtt-cloud-connector/config"
	"cg-edge-configurator/configurator"

	"github.com/gin-gonic/gin"
)

// GetTodoListHandler returns all current todo items
func GetConfigHandler(c *gin.Context) {
	appName := c.Param("appName")
	c.JSON(http.StatusOK, configurator.Get(appName))
}

// AddTodoHandler adds a new todo to the todo list
func SetConfigHandler(c *gin.Context) {
	appName := c.Param("appName")
	configFile, statusCode, err := convertHTTPBodyToTodo(c.Request.Body)
	if err != nil {
		c.JSON(statusCode, err)
		return
	}
	c.JSON(statusCode, configurator.Set(appName, configFile))
}

func DeleteConfigHandler(c *gin.Context) {

}

func PutConfigHandler(c *gin.Context) {

}

func convertHTTPBodyToTodo(httpBody io.ReadCloser) (mqttcloudconfig.Config, int, error) {
	body, err := ioutil.ReadAll(httpBody)
	if err != nil {
		return mqttcloudconfig.Config{}, http.StatusInternalServerError, err
	}
	defer httpBody.Close()
	return convertJSONBodyToTodo(body)
}

func convertJSONBodyToTodo(jsonBody []byte) (mqttcloudconfig.Config, int, error) {
	var Config mqttcloudconfig.Config
	err := json.Unmarshal(jsonBody, &Config)
	if err != nil {
		return mqttcloudconfig.Config{}, http.StatusBadRequest, err
	}
	return Config, http.StatusOK, nil
}

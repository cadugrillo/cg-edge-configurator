package handlers

import (
	"net/http"

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
	//configFile, statusCode, err := convertHTTPBodyToTodo(c.Request.Body)
	//if err != nil {
	//	c.JSON(statusCode, err)
	//	return
	//}
	//c.JSON(statusCode, config.Set(appName))
	c.JSON(0, configurator.Set(appName))
}

func DeleteConfigHandler(c *gin.Context) {

}

func PutConfigHandler(c *gin.Context) {

}

//func convertHTTPBodyToTodo(httpBody io.ReadCloser) (dbdriver.Todo, int, error) {
//	body, err := ioutil.ReadAll(httpBody)
//	if err != nil {
//		return dbdriver.Todo{}, http.StatusInternalServerError, err
//	}
//	defer httpBody.Close()
//	return convertJSONBodyToTodo(body)
//}

//func convertJSONBodyToTodo(jsonBody []byte) (dbdriver.Todo, int, error) {
//	var todoItem dbdriver.Todo
//	err := json.Unmarshal(jsonBody, &todoItem)
//	if err != nil {
//		return dbdriver.Todo{}, http.StatusBadRequest, err
//	}
//	return todoItem, http.StatusOK, nil
//}

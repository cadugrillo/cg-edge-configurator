package apps_repository

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type Response struct {
	Version   string     `json:"version"`
	Templates []Template `json:"templates"`
}

type Template struct {
	Type           int      `json:"type"`
	Title          string   `json:"title"`
	Name           string   `json:"name"`
	Hostname       string   `json:"hostname"`
	Description    string   `json:"description"`
	Categories     []string `json:"categories"`
	Platform       string   `json:"platform"`
	Logo           string   `json:"logo"`
	Image          string   `json:"image"`
	Restart_policy string   `json:"restart_policy"`
	Network        string   `json:"network"`
	Ports          []string `json:"ports"`
	Volumes        []string `json:"volumes"`
}

var (
	responseObject Response
)

func GetApps() Response {

	url := "https://raw.githubusercontent.com/cadugrillo/cg-edge-resources/main/templates-2.0.json"

	req, _ := http.NewRequest("GET", url, nil)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		println(err.Error())
		return responseObject
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		println(err.Error())
		return responseObject
	}

	json.Unmarshal(body, &responseObject)
	return responseObject
}

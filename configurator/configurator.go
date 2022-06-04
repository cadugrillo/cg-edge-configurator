package configurator

import (
	mqttcloudconfig "cg-edge-configurator/apps/mqtt-cloud-connector/config"
)

var ()

func init() {

}

func Get(appName string) any {
	switch appName {
	case "mqtt-cloud-connector":
		return mqttcloudconfig.ReadConfig()

	}
	return nil
}

func Set(appName string) string {

	return ""
}

package configurator

import (
	mqttcloudconfig "cg-edge-configurator/apps/mqtt-cloud-connector/config"
)

var ()

func init() {

}

func Get(appName string) mqttcloudconfig.Config {
	switch appName {
	case "mqtt-cloud-connector":
		return mqttcloudconfig.ReadConfig()

	}
	return mqttcloudconfig.Config{}
}

func Set(appName string, ConfigFile mqttcloudconfig.Config) string {
	switch appName {
	case "mqtt-cloud-connector":
		err1 := mqttcloudconfig.WriteConfig(ConfigFile)
		if err1 != nil {
			panic(err1)
		}
		return "Configuration updated successfully"

	}
	return "no app found"
}

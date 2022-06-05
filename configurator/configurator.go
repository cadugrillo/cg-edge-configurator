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

func Set(appName string, ConfigFile any) string {
	switch appName {
	case "mqtt-cloud-connector":
		err1 := mqttcloudconfig.WriteConfig((ConfigFile).(mqttcloudconfig.Config))
		if err1 != nil {
			panic(err1)
		}
		return "Configuration updated successfully"

	}
	return "no app found"
}

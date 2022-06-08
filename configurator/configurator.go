package configurator

import (
	mqttcloudconfig "cg-edge-configurator/apps/mqtt-cloud-connector/config"
	opcuaconfig "cg-edge-configurator/apps/opcua-mqtt-connector/config"
)

var ()

func init() {

}

func GetMccConfig() mqttcloudconfig.Config {
	return mqttcloudconfig.ReadConfig()
}

func SetMccConfig(ConfigFile mqttcloudconfig.Config) string {
	err1 := mqttcloudconfig.WriteConfig(ConfigFile)
	if err1 != nil {
		panic(err1)
	}
	return "Configuration updated successfully"
}

func GetOpcuaConfig() opcuaconfig.Config {
	return opcuaconfig.ReadConfig()
}

func SetOpcuaConfig(ConfigFile opcuaconfig.Config) string {
	err1 := opcuaconfig.WriteConfig(ConfigFile)
	if err1 != nil {
		panic(err1)
	}
	return "Configuration updated successfully"
}

package mqttcloudconfig

import (
	"os"

	"gopkg.in/yaml.v2"
)

type Config struct {
	ClientSub struct {
		ClientId           string `yaml:"clientId"`
		ServerAddress      string `yaml:"serverAddress"`
		Qos                int    `yaml:"qos"`
		ConnectionTimeout  int    `yaml:"connectionTimeout"`
		WriteTimeout       int    `yaml:"writeTimeout"`
		KeepAlive          int    `yaml:"keepAlive"`
		PingTimeout        int    `yaml:"pingTimeout"`
		ConnectRetry       bool   `yaml:"connectRetry"`
		AutoConnect        bool   `yaml:"autoConnect"`
		OrderMaters        bool   `yaml:"orderMaters"`
		UserName           string `yaml:"userName"`
		Password           string `yaml:"password"`
		TlsConn            bool   `yaml:"tlsConn"`
		RootCAPath         string `yaml:"rootCAPath"`
		ClientKeyPath      string `yaml:"clientKeyPath"`
		PrivateKeyPath     string `yaml:"privateKeyPath"`
		InsecureSkipVerify bool   `yaml:"insecureSkipVerify"`
	} `yaml:"clientSub"`
	ClientPub struct {
		ClientId           string `yaml:"clientId"`
		ServerAddress      string `yaml:"serverAddress"`
		Qos                int    `yaml:"qos"`
		ConnectionTimeout  int    `yaml:"connectionTimeout"`
		WriteTimeout       int    `yaml:"writeTimeout"`
		KeepAlive          int    `yaml:"keepAlive"`
		PingTimeout        int    `yaml:"pingTimeout"`
		ConnectRetry       bool   `yaml:"connectRetry"`
		AutoConnect        bool   `yaml:"autoConnect"`
		OrderMaters        bool   `yaml:"orderMaters"`
		UserName           string `yaml:"userName"`
		Password           string `yaml:"password"`
		TlsConn            bool   `yaml:"tlsConn"`
		RootCAPath         string `yaml:"rootCAPath"`
		ClientKeyPath      string `yaml:"clientKeyPath"`
		PrivateKeyPath     string `yaml:"privateKeyPath"`
		InsecureSkipVerify bool   `yaml:"insecureSkipVerify"`
		TranslateTopic     bool   `yaml:"translateTopic"`
		PublishInterval    int    `yaml:"publishInterval"`
	} `yaml:"clientPub"`
	Logs struct {
		SubPayload bool `yaml:"subPayload"`
		Debug      bool `yaml:"debug"`
		Warning    bool `yaml:"warning"`
		Error      bool `yaml:"error"`
		Critical   bool `yaml:"critical"`
	} `yaml:"logs"`
	TopicsSub struct {
		Topic []string
	} `yaml:"topicsSub"`
	TopicsPub struct {
		Topic []string
	} `yaml:"topicsPub"`
}

type ConfigJSON struct {
	ClientSub struct {
		ClientId           string `json:"clientId"`
		ServerAddress      string `json:"serverAddress"`
		Qos                int    `json:"qos"`
		ConnectionTimeout  int    `json:"connectionTimeout"`
		WriteTimeout       int    `json:"writeTimeout"`
		KeepAlive          int    `json:"keepAlive"`
		PingTimeout        int    `json:"pingTimeout"`
		ConnectRetry       bool   `json:"connectRetry"`
		AutoConnect        bool   `json:"autoConnect"`
		OrderMaters        bool   `json:"orderMaters"`
		UserName           string `json:"userName"`
		Password           string `json:"password"`
		TlsConn            bool   `json:"tlsConn"`
		RootCAPath         string `json:"rootCAPath"`
		ClientKeyPath      string `json:"clientKeyPath"`
		PrivateKeyPath     string `json:"privateKeyPath"`
		InsecureSkipVerify bool   `json:"insecureSkipVerify"`
	} `json:"clientSub"`
	ClientPub struct {
		ClientId           string `json:"clientId"`
		ServerAddress      string `json:"serverAddress"`
		Qos                int    `json:"qos"`
		ConnectionTimeout  int    `json:"connectionTimeout"`
		WriteTimeout       int    `json:"writeTimeout"`
		KeepAlive          int    `json:"keepAlive"`
		PingTimeout        int    `json:"pingTimeout"`
		ConnectRetry       bool   `json:"connectRetry"`
		AutoConnect        bool   `json:"autoConnect"`
		OrderMaters        bool   `json:"orderMaters"`
		UserName           string `json:"userName"`
		Password           string `json:"password"`
		TlsConn            bool   `json:"tlsConn"`
		RootCAPath         string `json:"rootCAPath"`
		ClientKeyPath      string `json:"clientKeyPath"`
		PrivateKeyPath     string `json:"privateKeyPath"`
		InsecureSkipVerify bool   `json:"insecureSkipVerify"`
		TranslateTopic     bool   `json:"translateTopic"`
		PublishInterval    int    `json:"publishInterval"`
	} `json:"clientPub"`
	Logs struct {
		SubPayload bool `json:"subPayload"`
		Debug      bool `json:"debug"`
		Warning    bool `json:"warning"`
		Error      bool `json:"error"`
		Critical   bool `json:"critical"`
	} `json:"logs"`
	TopicsSub struct {
		Topic []string
	} `json:"topicsSub"`
	TopicsPub struct {
		Topic []string
	} `json:"topicsPub"`
}

func ReadConfig() Config {
	f, err := os.Open("./apps/mqtt-cloud-connector/config/config.yml")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	var cfg Config
	decoder := yaml.NewDecoder(f)
	err = decoder.Decode(&cfg)
	if err != nil {
		panic(err)
	}

	return cfg
}

func WriteConfig(ConfigFile Config) error {
	f, err := os.OpenFile("./apps/mqtt-cloud-connector/config/config.yml", os.O_RDWR, 0644)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	encoder := yaml.NewEncoder(f)
	err = encoder.Encode(&ConfigFile)
	if err != nil {
		panic(err)
	}
	f.Close()
	//cfg, err1 := json.Marshal(ConfigFile)
	//if err1 != nil {
	//	return err1
	//}
	//err2 := os.WriteFile("./apps/mqtt-cloud-connector/config/config.yml", cfg, 0644)
	//if err1 != nil {
	//	return err2
	//}
	return err
}

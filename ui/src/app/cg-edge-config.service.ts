import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CgEdgeConfigService {

  constructor(private httpClient: HttpClient) {}

getConfig(appName: string) {
    return this.httpClient.get(environment.gateway + '/config/' + appName);
  }

setMccConfig(appName: string, mccConfig: MccConfig) {
    return this.httpClient.post(environment.gateway + '/config/mqtt-cloud-connector', mccConfig);
  }

}

export class MccConfig {
  ClientSub!: ClientSub;
  ClientPub!: ClientPub;
  Logs!: Logs;
  TopicsSub!: TopicsSub;
  TopicsPub!: TopicsPub;
}

class ClientSub {
  ClientId!:           string;
	ServerAddress!:      string;
	Qos!:                number;
	ConnectionTimeout!:  number;
	WriteTimeout!:       number;
	KeepAlive!:          number;
	PingTimeout!:        number;
	ConnectRetry!:       number;
	AutoConnect!:        number;
	OrderMaters!:        boolean;
	UserName!:           string;
	Password!:           string;
	TlsConn!:            boolean;
	RootCAPath!:         string;
	ClientKeyPath!:      string;
	PrivateKeyPath!:     string;
	InsecureSkipVerify!: boolean;
}

class ClientPub {
  ClientId!:           string;
  ServerAddress!:      string;
  Qos!:                number;
  ConnectionTimeout!:  number;
  WriteTimeout!:       number;
  KeepAlive!:          number;
  PingTimeout!:        number;
  ConnectRetry!:       number;
  AutoConnect!:        number;
  OrderMaters!:        number;
  UserName!:           string;
  Password!:           string;
  TlsConn!:            boolean;
  RootCAPath!:         string;
  ClientKeyPath!:      string;
  PrivateKeyPath!:     string;
  InsecureSkipVerify!: boolean;
  TranslateTopic!:     boolean;
  PublishInterval!:    number;

}

class Logs {
  SubPayload!: boolean;
  Debug!: boolean;
  Warning!: boolean; 
  Error!: boolean;
  Critical!: boolean; 
}

class TopicsSub {
  Topic!: string[];
}

class TopicsPub {
  Topic!: string[];
}


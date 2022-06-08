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

setMccConfig(mccConfig: MccConfig) {
    return this.httpClient.post(environment.gateway + '/config/mqtt-cloud-connector', mccConfig);
  }

setOpcuaConfig(opcuaConfig: OpcuaConfig) {
    return this.httpClient.post(environment.gateway + '/config/opcua-mqtt-connector', opcuaConfig);
  }
}

export class MccConfig {
  ClientSub!: ClientSub;
  ClientPub!: ClientPub;
  Logs!: Logs;
  TopicsSub!: TopicsSub;
  TopicsPub!: TopicsPub;
}

export class OpcuaConfig {
  OpcuaClient!: OpcuaClient;
  ClientPub!: ClientPub;
  Logs!: Logs;
  TopicsPub!: TopicsPub;
  NodesToRead!: NodesToRead;
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

class OpcuaClient {
  ClientId!:           string;
  ServerAddress!:      string;
  PollInterval!:       number;
  MaxAge!:             number;
  MaxSignalsPerRead!:  number;
  MinTimeBetweenRead!: number;
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

class NodesToRead {
  Nodes!: Node[];
}

export class Node {
  Name!: string;
  NodeID!: string;
}


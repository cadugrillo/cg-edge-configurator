import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CgEdgeNetworksService {

  constructor(private httpClient: HttpClient) {}

  getNetworks() {
    return this.httpClient.get(environment.gateway + '/networks/json');
  }

  createNetwork(Id: string) {
    return this.httpClient.post(environment.gateway + '/networks/'+ Id + '/create', '');
  }

  removeNetwork(Id: string) {
    return this.httpClient.post(environment.gateway + '/networks/'+ Id + '/remove', '');
  }
}

export class Network {
  Name!: string
  Id!: string
  Created!: string
  Scope!: string
  Driver!: string
  EnableIPv6!: boolean
  IPAM!: IPAM
  Internal!: boolean
  Attachable!: boolean
  Ingress!: boolean
  Containers!: Map<string,EndPointResource>
  Options!: Map<string,string>
  Labels!: Map<string,string>
}

class IPAM {
  Driver!: string
	Options!: Map<string,string>
	Config!: IPAMConfig[]
}

class IPAMConfig {
  Subnet!: string
	IPRange!: string
	Gateway!: string
	AuxAddress!: Map<string,string>
}

class EndPointResource {
  Name!: string
	EndpointID!: string
	MacAddress!: string
	IPv4Address!: string
	IPv6Address!: string
}
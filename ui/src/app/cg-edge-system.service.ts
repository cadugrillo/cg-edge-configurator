import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CgEdgeSystemService {

  constructor(private httpClient: HttpClient) {}

  getHostNetwork() {
    return this.httpClient.get(environment.gateway + '/system/hostnetwork');
  }

  setHostNetwork(InterfaceSet: InterfaceSet) {
    return this.httpClient.post(environment.gateway + '/system/hostnetwork', InterfaceSet);
  }
}

export class InterfaceSet {
  InterfacePath!: string
  Adapters!: Adapter[]
}

class Adapter {
  AddrFamily!: number
  AddrSource!: number
  Address!: string
  Auto!: boolean
  Broadcast!: string
  Gateway!: string
  Hotplug!: boolean
  Name!: string
  Netmask!: string
  Network!: string
}

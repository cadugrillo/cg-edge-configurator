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

  restartHostSystem() {
    return this.httpClient.post(environment.gateway + '/system/restart', '');
  }

  shutdownHostSystem() {
    return this.httpClient.post(environment.gateway + '/system/shutdown', '');
  }

  getHostStats() {
    return this.httpClient.get(environment.gateway + '/system/hoststats');
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

export class HostStats {
  CpuUsage!: number[]
  RamTotal!: number
  RamUsed!: number
  RamUsedPct!: number
  RamAvailable!: number
  RamFree!: number
  DiskUsage!: number
  DiskAvailable!: number
  DiskTotal!: number
}

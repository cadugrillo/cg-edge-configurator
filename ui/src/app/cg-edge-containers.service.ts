import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CgEdgeContainersService {

  constructor(private httpClient: HttpClient) {}

  getContainers() {
    return this.httpClient.get(environment.gateway + '/containers/json');
  }

  getContainersLogs(Id: string) {
    return this.httpClient.get(environment.gateway + '/containers/'+ Id + '/logs');
  }

  installContainer(AppTemplate: Template) {
    return this.httpClient.post(environment.gateway + '/containers/install', AppTemplate);
  }

  startContainer(Id: string) {
    return this.httpClient.post(environment.gateway + '/containers/'+ Id + '/start', '');
  }

  stopContainer(Id: string) {
    return this.httpClient.post(environment.gateway + '/containers/'+ Id + '/stop', '');
  }

  restartContainer(Id: string) {
    return this.httpClient.post(environment.gateway + '/containers/'+ Id + '/restart', '');
  }

  removeContainer(Id: string) {
    return this.httpClient.post(environment.gateway + '/containers/'+ Id + '/remove', '');
  }

  getContainersRepo() {
    return this.httpClient.get(environment.gateway + '/containers/repository');
  }

  getDockerServerInfo() {
    return this.httpClient.get(environment.gateway + '/containers/info');
  }
}

export class Container {
  Id!: string
  Names!: string[]
  ImageID!: string
  Command!: string
  Created!: EpochTimeStamp
  State!: string
  Status!: string
  Ports!: Port[]
  //Labels!: any
  SizeRw!: number
  SizeRootFs!: number
  HostConfig!: HostConfig
  //NetworkSettings!: any
  //Mounts!: any
}

class Port {
  PrivatePort!: number
  PublicPort!: number
  Type!: string
}

class HostConfig {
  NetworkMode!: string
}

export class ContainersRepo {
  version!: string
  templates!: Template[]
}

export class Template {
  type!: string
	title!: string
	name!: string
	hostname!: string
	description!: string
  info_url!: string
	categories!: string[]
	platform!: string
	logo!: string
	image!: string
	restart_policy!: string
	network!: string
  env!: string[]
	ports!: string[]
	volumes!: string[]
}

export class SystemInfo {
  Architecture!: string
  BridgeNfIp6tables!: boolean
  BridgeNfIptables!: boolean
  CPUSet!: boolean
  CPUShares!: boolean
  CgroupDriver!: string
  CgroupVersion!: string
  Containers!: number
  ContainersPaused!: number
  ContainersRunning!: number
  ContainersStopped!: number
  CpuCfsPeriod!: boolean
  CpuCfsQuota!: boolean
  Debug!: boolean
  DefaultRuntime!: string
  DockerRootDir!: string
  Driver!: string
  ExperimentalBuild!: boolean
  HttpProxy!: string
  HttpsProxy!: string
  ID!: string
  IPv4Forwarding!: boolean
  Images!: number
  IndexServerAddress!: string
  InitBinary!: string
  Isolation!: string
  KernelMemory!: boolean
  KernelMemoryTCP!: boolean
  KernelVersion!: string
  LiveRestoreEnabled!: boolean
  LoggingDriver!: string
  MemTotal!: number
  MemoryLimit!: boolean
  NCPU!: number
  NEventsListener!: number
  NFd!: number
  NGoroutines!: number
  Name!: string
  NoProxy!: string
  OSType!: string
  OSVersion!: string
  OomKillDisable!: boolean
  OperatingSystem!: string
  PidsLimit!: boolean
  ServerVersion!: string
  SwapLimit!: boolean
  SystemTime!: string
  Warnings!: string[]
}
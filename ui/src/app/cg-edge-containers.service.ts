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
	categories!: string[]
	platform!: string
	logo!: string
	image!: string
	restart_policy!: string
	network!: string
	ports!: string[]
	volumes!: string[]
}
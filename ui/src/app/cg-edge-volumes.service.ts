import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CgEdgeVolumesService {

  constructor(private httpClient: HttpClient) {}

  getVolumes() {
    return this.httpClient.get(environment.gateway + '/volumes/json');
  }

  removeVolume(Id: string) {
    return this.httpClient.post(environment.gateway + '/volumes/'+ Id + '/remove', '');
  }
}

export class VolumeList {
  Volumes!: Volume[]
  Warnings!: string[]
}

class Volume {
  Name!: string
  Driver!: string
  Mountpoint!: string
  CreatedAt!: string
  //Status!: Map<string,string>
  Labels!: Map<string,string>
  Scope!: string
  Options!: Map<string,string>
  UsageData!: UsageData
}

class UsageData {
  Size!: number
  RefCount!: number
}

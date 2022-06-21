import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CgEdgeImagesService {

  constructor(private httpClient: HttpClient) {}

  getImages() {
    return this.httpClient.get(environment.gateway + '/images/json');
  }

  removeImage(Id: string) {
    return this.httpClient.post(environment.gateway + '/images/'+ Id + '/remove', '');
  }
}

export class Image {
  Id!: string
  ParentId!: string
  RepoTags!: string[]
  RepoDigests!: string[]
  Created!: EpochTimeStamp
  Size!: number
  VirtualSize!: number
  SharedSize!: number
  Labels!: {}
  Containers!: number
}
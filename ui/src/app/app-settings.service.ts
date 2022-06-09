import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  constructor(private httpClient: HttpClient) { }

  getJSON() {
    return this.httpClient.get("./assets/data.json");
  }

}



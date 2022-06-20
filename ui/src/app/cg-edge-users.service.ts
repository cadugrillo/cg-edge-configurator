import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CgEdgeUsersService {

  Authenticated!: boolean 

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get(environment.gateway + '/users/json');
  }

  updateUsers(Users: Users) {
    return this.httpClient.post(environment.gateway + '/users/json', Users);
  }

  addUser() {
    return this.httpClient.get(environment.gateway + '/users/add');
  }

  deleteUser(Id: string) {
    return this.httpClient.post(environment.gateway + '/users/'+ Id, "");
  }

  login() {
    this.Authenticated = true

  }

  logout() {
    this.Authenticated = false
  }

  isAuthenticated() {
    return true
  }
}


export class Users {
  Users!: User[]
}

class User {
  ID!: string
  Username!: string
  Password!: string
  FullName!: string
  Email!: string
  Telephone!: string
  Permissions!: Permission
}

class Permission {
  Dashboard!: boolean
	Apps!: boolean
	AppsRepository!: boolean
	Users!: boolean
	Settings!: boolean
	System!: boolean
	Images!: boolean
	Placeholder1!: boolean
	Placeholder2!: boolean
	Placeholder3!: boolean
	Placeholder4!: boolean
}

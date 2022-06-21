import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CgEdgeUsersService {

  Authenticated!: boolean 
  private authenticationSubject: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient) {

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

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
    this.authenticationSubject.next(true);

  }

  logout() {
    this.authenticationSubject.next(false);
  }

  isAuthenticated() {
    return true
}
}

export class Users {
  Users!: User[]
}

export class User {
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

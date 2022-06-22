import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CgEdgeUsersService {

  CurrentUser!: User
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

  validateUser(User: User) {
    return this.httpClient.post(environment.gateway + '/users/validate', User);
  }

  Login(User: User): Observable<any> {
    var subject = new Subject<any>();
    this.validateUser(User).subscribe((data) => {
        this.CurrentUser = data as User;
        if (this.CurrentUser.Username == "invalid" || this.CurrentUser.Username == "") {
          this.authenticationSubject.next(false);
          subject.next(this.authenticationSubject.value);
        } else {
          this.authenticationSubject.next(true);
          subject.next(this.authenticationSubject.value);
        }  
    });
    return subject.asObservable();
  }


  logout() {
    this.CurrentUser = {} as User
    this.authenticationSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.authenticationSubject.value
  }

  getCurrentUser(): User {
    return this.CurrentUser;
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

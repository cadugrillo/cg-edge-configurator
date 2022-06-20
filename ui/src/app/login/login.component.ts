import { Component, OnInit } from '@angular/core';
import { CgEdgeUsersService, User } from '../cg-edge-users.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User

  constructor(private CgEdgeUsersService: CgEdgeUsersService) { }

  ngOnInit(): void {
  }

  login() {
    this.CgEdgeUsersService.login()
  }
}

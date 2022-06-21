import { Component, OnInit } from '@angular/core';
import { CgEdgeUsersService, User } from '../cg-edge-users.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  User: User = new User();

  constructor(private CgEdgeUsersService: CgEdgeUsersService,
              private router: Router) { }

  ngOnInit(): void {

  }

  login(User: User) {
    this.CgEdgeUsersService.login(User).then(() => {
      this.router.navigate(['/Dashboard']);
    });
    
  }
}

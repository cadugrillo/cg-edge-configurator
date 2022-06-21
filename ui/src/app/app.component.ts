import { Component } from '@angular/core';
import { CgEdgeUsersService, User } from './cg-edge-users.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CG-EDGE-CONF';

  

  constructor(private CgEdgeUsersService: CgEdgeUsersService,
              private router: Router) {
    
  }

  public ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.CgEdgeUsersService.logout();
    this.router.navigate(['/Login']);
  }

  isAuthenticated() {
    return this.CgEdgeUsersService.isAuthenticated();
  }
}

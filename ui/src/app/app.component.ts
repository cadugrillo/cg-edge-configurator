import { Component } from '@angular/core';
import { CgEdgeUsersService, User } from './cg-edge-users.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CG-EDGE-CONF';

  authenticated!: boolean

  constructor(private CgEdgeUsersService: CgEdgeUsersService) {
    
  }

  public ngOnInit(): void {
    this.authenticated = this.CgEdgeUsersService.isAuthenticated()
  }

  logout() {
    this.CgEdgeUsersService.logout()
  }
}

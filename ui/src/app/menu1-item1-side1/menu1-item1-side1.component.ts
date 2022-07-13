import { Component, OnInit } from '@angular/core';
import { CgEdgeUsersService, User } from '../cg-edge-users.service'

@Component({
  selector: 'menu1-item1-side1',
  templateUrl: './menu1-item1-side1.component.html',
  styleUrls: ['./menu1-item1-side1.component.css']
})
export class Menu1Item1Side1Component implements OnInit {

  currentUser!: User

  constructor(private CgEdgeUsersService: CgEdgeUsersService) {}

  ngOnInit(): void {
    
  }

  isAuthenticated() {
    return this.CgEdgeUsersService.isAuthenticated();
  }

  AppsMenuDisabled() {
    return !this.CgEdgeUsersService.CurrentUser.Permissions.Apps
  }

  AppsRepMenuDisabled() {
    return !this.CgEdgeUsersService.CurrentUser.Permissions.AppsRepository
  }

  AppLaunchMenuDisabled() {
    return !this.CgEdgeUsersService.CurrentUser.Permissions.AppsRepository
  }

  ImagesMenuDisabled() {
    return !this.CgEdgeUsersService.CurrentUser.Permissions.Images
  }

  VolumesMenuDisabled() {
    return !this.CgEdgeUsersService.CurrentUser.Permissions.Images
  }

  SettingsMenuDisabled() {
    return !this.CgEdgeUsersService.CurrentUser.Permissions.Settings
  }

  UsersMenuDisabled() {
    return !this.CgEdgeUsersService.CurrentUser.Permissions.Users
  }

  SystemMenuDisabled() {
    return !this.CgEdgeUsersService.CurrentUser.Permissions.System
  }
}

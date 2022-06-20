import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { CgEdgeUsersService } from './cg-edge-users.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private CgEdgeUsersService: CgEdgeUsersService) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
   
    return new Promise((resolve, reject) => {
      
      return resolve (this.CgEdgeUsersService.isAuthenticated())

    });
  }
}

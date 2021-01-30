import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {CurrentUser} from '../models/current-user';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // if (CurrentUser.accountName === undefined) {
    //   return true;
    // }
    // else {
    //   this.router.navigate(['/']);
    // }
    // return false;
    return true;
  }
}

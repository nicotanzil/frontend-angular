import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private router: Router,
    private service: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Guard to determine whether the user can get into login/register page
    // var observer = new Observable<boolean>(subscriber => {
    //   subthis.service.getUserAuth().subscribe(async query => {
    //     if (query.data.getUserAuth.accountName !== '') {
    //       return false;
    //     }
    //   })
    // });
    return true;
  }
}

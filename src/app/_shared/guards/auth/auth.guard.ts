// import { userInfo } from 'os';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageHelper } from 'src/app/helpers/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn()) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn()) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }

  isLoggedIn() {
    const userInfo = StorageHelper.userInfo;
    if (userInfo && userInfo.email) {
      return true;
    }
    return false;
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard {

  constructor(
    private auth:AuthService,
    private router:Router,
    ){}

  private checkAuthStatus():boolean | Observable<boolean>{
    return this.auth.checkAuthentication().pipe(
      tap( isAuthenticated => {
        if (isAuthenticated ){
          this.router.navigate(['./'])
        }
      }),
      map(isAuthenticated => !isAuthenticated),
    )
  }

  canMatch: CanMatchFn = (route: Route, segments: UrlSegment[]): boolean | Observable<boolean> => {
    return this.checkAuthStatus();
  };

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> => {
    return this.checkAuthStatus();
  };

}
function next(arg0: void): import("rxjs").OperatorFunction<boolean, unknown> {
  throw new Error('Function not implemented.');
}


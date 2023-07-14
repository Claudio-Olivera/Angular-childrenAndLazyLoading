import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(
    private auth:AuthService,
    private router:Router,
    ){}

  private checkAuthStatus():boolean | Observable<boolean>{
    return this.auth.checkAuthentication().pipe(
      tap( isAuthenticated => {
        if(!isAuthenticated){
          this.router.navigate(['./auth/login'])
        }
      })
    )
  }

  canMatch: CanMatchFn = (route: Route, segments: UrlSegment[]): boolean | Observable<boolean> => {
    return this.checkAuthStatus();
  };

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> => {
    return this.checkAuthStatus();
  };

}

//si estoy auth no puedo ver login y ser redireccionado a heroes

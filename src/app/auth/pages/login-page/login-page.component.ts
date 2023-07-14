import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(private auth:AuthService,
    private router:Router,
    ){}

  onLogin():void{
    this.auth.login('claudioolivera@gmail.com','rionegri12').subscribe( user => {

      this.router.navigate(['/'])

    } )
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authSrvc : AuthService,
    private router : Router,
    private flashSrvc : FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    this.authSrvc.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authSrvc.storeUserData(data.token, data.user);
        this.flashSrvc.show('You are now logged in!', { cssClass : 'alert-success', timeout: 5000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashSrvc.show(data.msg, { cssClass : 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }

}

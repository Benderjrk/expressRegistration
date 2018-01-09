import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validSrvc : ValidateService,
    private flashSrvc : FlashMessagesService,
    private authSrvc : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      name : this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //required fields
    if(!this.validSrvc.validateRegister(user)){
      this.flashSrvc.show("Please Fill In All Fields", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    if(!this.validSrvc.validateEmail(user.email)){
      this.flashSrvc.show("Please Fill In A Valid Email", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    if(!this.validSrvc.validatePassword(user.password)){
      this.flashSrvc.show("Password needs a minimum eight characters, at least one letter, one number and one special character", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    // Register User

    this.authSrvc.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashSrvc.show("You are now registered and can login", {cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/login']);
      } else {
        this.flashSrvc.show("Registration Failed", {cssClass: 'alert-danger', timeout:3000});
        this.router.navigate(['/register']);


      }
    });
  }

}

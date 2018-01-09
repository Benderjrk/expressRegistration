import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;

  constructor(
    private authSrvc : AuthService,
    private router : Router,
    private flashSrvc : FlashMessagesService
  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.authSrvc.logout();
    this.flashSrvc.show("You are logged out!", { cssClass : 'alert-success', timeout: 5000});
    this.router.navigate(['/']);
    return false;
  }

}

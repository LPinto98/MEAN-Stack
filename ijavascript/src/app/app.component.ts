import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ijavascript';
  loggedIn:boolean = false;
  constructor(
    private authService:AuthService,
    private router:Router
  ){}
  ngOnInit(){
    this.authService.autoAuthUser();
    const userAuthenticated = this.authService.getIsAuth();
    this.loggedIn = userAuthenticated;
  }
}

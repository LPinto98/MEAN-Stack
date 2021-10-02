import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn:boolean = false;
  private authStatusSub: Subscription = new Subscription;
  userIsAuthenticated = false;

  constructor(
    private authService:AuthService,
    private router:Router,
    private dataService: DataService
  ){}

  ngOnInit():void{
    const userAuthenticated = this.authService.getIsAuth();
    this.loggedIn = userAuthenticated;
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    // console.log(this.dataService.getData());
  }

}

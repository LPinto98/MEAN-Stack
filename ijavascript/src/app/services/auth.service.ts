import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthData } from "../data-models/auth-data.model";
import { Observable, throwError, of } from "rxjs";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
@Injectable ({ providedIn: "root" })
export class AuthService {

  private token:string | any = '';
  private error:boolean = false;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router:Router) {}

  getToken(){
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  login(userid:string, password:string){
    const authData: AuthData = {userid: userid, password: password};
    this.http.post<{token:string, expiresIn: number, isUserAuthenticated:boolean}>("http://localhost:3000/api/user/login", authData)
      .subscribe( response => {
        const token = response.token;
        this.isAuthenticated = response.isUserAuthenticated;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
          const loginDateTime = new Date(now.getTime());
          this.saveAuthData(token, expirationDate, loginDateTime);
          this.router.navigate(["/home/dashboard"]);
        }
        return response;
      },
      error => {
        return error;
      });
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    const now = new Date();
    if(authInfo){
      const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
      if(expiresIn>0){
        this.token = authInfo.token;
        this.isAuthenticated = true;
        this.setAuthTimer(expiresIn/1000);
        this.authStatusListener.next(true);
      }
    }
    else{
      return;
    }
  }

  logout() {
    let last_login = localStorage.getItem('login_time');
    let updateData = {
      last_login : last_login
    }
    this.http.put("http://localhost:3000/api/user/last_login", updateData);
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['']);
  }

  private setAuthTimer(duration: number){
    console.log("Setting timer : "+duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration*1000);
  }
  private saveAuthData(token:string, expirationDate: Date, loginDateTime: Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
    localStorage.setItem('login_time',loginDateTime.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("login_time");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errormsg = '';
  error = false;
  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    if(form.invalid){
      this.error = true;
      this.errormsg = "Error: Please enter login credentials to continue!";
      form.reset();
      return;
    }
    console.log(form.value);
    this.authService.login(form.value.userid, form.value.password);
    const userAuthenticated = this.authService.getIsAuth();
    if(userAuthenticated){
      form.reset();
      this.router.navigate(['/home/dashboard']);
    }
    else{
      this.error = true;
      this.errormsg = "Error: Invalid User Credentials!";
      form.reset();
      return;
    }
  }

}

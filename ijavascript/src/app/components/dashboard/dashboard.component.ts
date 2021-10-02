import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private authStatusSub: Subscription = new Subscription;
  userIsAuthenticated = false;
  textInput = 'Two Way Binding Example';
  firstname = '';
  lastname = '';
  balance = '';
  last_login = '';
  transactions:any = [];
  data: any;
  constructor( private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(response =>{
      this.data = response;
      console.log(this.data);
      this.firstname = this.data.name.split(' ')[0];
      this.lastname = this.data.name.split(' ')[1];
      this.balance = this.data.balance;
      this.last_login = this.data.last_login;

      for(let transaction of this.data.transaction){
        let amount = transaction.amount;
        let description = transaction.description;
        let date = transaction.date;
        let obj = {"amount":amount, "description":description, "date":date};
        this.transactions.push(obj);
      }
      console.log(this.transactions);
    });
  }

}

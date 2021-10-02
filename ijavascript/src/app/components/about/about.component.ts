import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  data = [
    {
      "title" : 'Hello',
      "description" : 'This is card 1'
    },
    {
      "title" : "Hi",
      "description" : "This is card 2"
    },
    {
      "title" : "Hey!",
      "description" : "This is card 3"
    }
  ];
  constructor() { }
  ngOnInit(): void {
  }

}

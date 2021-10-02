import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() public cardData: any;
  // @Input() public data: any;

  constructor() { }

  ngOnInit(): void {
  }

}

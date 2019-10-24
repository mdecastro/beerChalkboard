import { Component, OnInit, Input } from '@angular/core';
import { Beer } from './../beer/beer.model';
import { BrewerInt } from './../brewer/brewer.interface';
import { BeerStyle } from './../beer-style/beer-style.interface';

@Component({
  selector: 'app-board-beer',
  templateUrl: './board-beer.component.html',
  styleUrls: ['./board-beer.component.scss']
})
export class BoardBeerComponent implements OnInit {
  @Input() beer: Beer;
  @Input() brewer: BrewerInt;
  @Input() style: BeerStyle;

  constructor() { }

  ngOnInit() {
    console.log(this.brewer, this.style)
  }

}

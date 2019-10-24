import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer/beer.service';
import { BrewerService } from '../brewer/brewer.service';
import { BeerStyleService } from '../beer-style/beer-style.service';

import { BrewerInt } from './../brewer/brewer.interface';
import { Beer } from './../beer/beer.model';
import { BeerStyle } from './../beer-style/beer-style.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private beerService: BeerService, private brewerService: BrewerService, private beerStyleService: BeerStyleService) { }

  brewers: Array<BrewerInt>;
  beers: Array<Beer>;
  styles: Array<BeerStyle>;

  ngOnInit() {
    this.beerStyleService.getStyles().subscribe(s => {
      this.styles = s;
    });
    this.brewerService.getBrewers().subscribe(b => {
      this.brewers = b;
    });
    this.beerService.getBeers().subscribe(be => {
      this.beers = be.filter(b => b.active === true);
      console.log(this.beers)
    });
  }

  getBrewer(aBrewerId: string): BrewerInt {
    return this.brewers.find(e => e.id === aBrewerId); 
  }

  getStyle(aStyleId: string): BeerStyle {
    return this.styles.find(e => e.id === aStyleId); 
  }

}

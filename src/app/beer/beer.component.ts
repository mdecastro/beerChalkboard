import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }  from '@angular/forms';
import { Beer } from './beer.model';
import { BeerStyleService } from './../beer-style/beer-style.service';
import { BrewerService } from './../brewer/brewer.service';
import { BeerService} from './beer.service';
import { BeerStyle } from './../beer-style/beer-style.interface';
import { BrewerInt } from './../brewer/brewer.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit {

  otra: string;
  toggleForm: boolean = false;
  beerForm: FormGroup;
  glasses: Array<Object> = [{ value: 1, name: 'Normal' }, { value: 2, name: 'Inglesa' }, {value: 3, name: 'Copa'}, {value: 4, name: 'Trigo'}];
  order: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8]; 
  styles$: Observable<BeerStyle[]>;
  styles: Array<BeerStyle> = [];
  brewers$: Observable<BrewerInt[]>;
  brewers: Array<BrewerInt> = [];
  beers$: Observable<Beer[]>;
  beersQt: number = 0;
  displayedColumns: string[] = ['name', 'style', 'brewer', 'alc', 'srm', 'ibu', 'glass', 'normalPrice', 'happyPrice', 'active', 'position', 'actions'];

  constructor(fb: FormBuilder, private styleService: BeerStyleService, private brewerService: BrewerService, private beerService: BeerService) {
    this.beerForm = fb.group({
      name: ['', Validators.required],
      style: ['', Validators.required],
      brewer: ['', Validators.required],
      alc: ['', Validators.required],
      srm: [''],
      ibu: ['', Validators.required],
      glass: ['', Validators.required],
      normalPrice: ['', Validators.required],
      happyPrice: ['', Validators.required],
      active: [''],
      position: [''],
      id: ['']
    })
  }

  ngOnInit() {
    this.styles$ = this.styleService.getStyles();
    this.brewers$ = this.brewerService.getBrewers();
    this.beers$ = this.beerService.getBeers();

    this.beers$.subscribe(b => this.beersQt = b.length);
    this.styles$.subscribe(s =>this.styles = s);
    this.brewers$.subscribe(b => this.brewers = b);
    
  }

  showForm(): void {
    this.toggleForm = !this.toggleForm;
    this.getBrewerName('ds');
  }

  delete(aBeer: Beer): void {
    if (confirm('Seguro?')) {
      this.beerService.deleteBeer(aBeer);
    }
  }

  getBrewerName(aBrewerId): string {
    let found = this.brewers.find(element => element.id === aBrewerId);
    return found ? found.name : '';
  }

  getStyleName(aStyleId): string {
    let found = this.styles.find(element => element.id === aStyleId);
    return found ? found.name : '';
  }

  edit(aBeer: Beer): void {
    this.setFormValues(
      aBeer.name,
      aBeer.styleId,
      aBeer.brewerId,
      aBeer.alc,
      aBeer.srm,
      aBeer.ibu,
      aBeer.glass,
      aBeer.normalPrice,
      aBeer.happyPrice,
      aBeer.active,
      aBeer.position,
      aBeer.id
    );
    this.showForm();
  }

  setFormValues(aName, aStyleId, aBrewerId, anAlc, aSrm, anIbu, aGlass, aNormalPrice, aHappyPrice, isActive, aPosition, anId): void {
    this.beerForm.controls.name.setValue(aName);
    this.beerForm.controls.style.setValue(aStyleId);
    this.beerForm.controls.brewer.setValue(aBrewerId);
    this.beerForm.controls.alc.setValue(anAlc);
    this.beerForm.controls.srm.setValue(aSrm);
    this.beerForm.controls.ibu.setValue(anIbu);
    this.beerForm.controls.glass.setValue(aGlass);
    this.beerForm.controls.normalPrice.setValue(aNormalPrice);
    this.beerForm.controls.happyPrice.setValue(aHappyPrice);
    this.beerForm.controls.active.setValue(isActive);
    this.beerForm.controls.position.setValue(aPosition);
    this.beerForm.controls.id.setValue(anId);
  }

  onSubmit(): void {
    if (!this.beerForm.valid) {
      return;
    }
    // Check if name already exists
    const update = this.beerForm.value.id;
    const formValues = this.beerForm.value;
    
    // Check if ID exists for update  
    if (update) {
      let aBeer: Beer = {
        id: update,
        name: formValues.name,
        styleId: formValues.style,
        brewerId: formValues.brewer,
        alc: formValues.alc,
        srm: formValues.srm,
        ibu: formValues.ibu,
        glass: formValues.glass,
        normalPrice: formValues.normalPrice,
        happyPrice: formValues.happyPrice,
        active: formValues.active,
        position: formValues.position
      };
      
      this.beerService.updateBeer(aBeer);
      this.beerForm.reset();
    } else  {
      const aNewBeer = new Beer(
        formValues.name, 
        formValues.style, 
        formValues.brewer, 
        formValues.alc, 
        formValues.srm, 
        formValues.ibu, 
        formValues.glass, 
        formValues.normalPrice, 
        formValues.happyPrice, 
        formValues.active,
        formValues.position
      );
      
      this.beerService.addBeer(aNewBeer);
      this.beerForm.reset();
    }
  }

}

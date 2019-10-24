import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeerStyleService } from './beer-style.service';
import { Observable } from 'rxjs';
import { BeerStyle } from './beer-style.interface';

@Component({
  selector: 'app-beer-style',
  templateUrl: './beer-style.component.html',
  styleUrls: ['./beer-style.component.scss']
})
export class BeerStyleComponent implements OnInit {

  styleForm: FormGroup;
  styles$: Observable<BeerStyle[]>;
  displayedColumns: string[] = ['name', 'actions'];
  collection: Array<BeerStyle> = [];

  constructor(private fb: FormBuilder, private beerStyleService: BeerStyleService) {}

  ngOnInit() {
    this.styleForm = this.fb.group({
      name: ['', Validators.required],
      id: ['']
    });
    this.styles$ = this.beerStyleService.getStyles();
    this.beerStyleService.getCollection().subscribe(val => { this.collection = val; });
  }

  delete(aStyle: BeerStyle) {
    if (confirm('Seguro que querés borrar ' + aStyle.name + '?')) {
      this.beerStyleService.deleteStyle(aStyle);
    }
  }

  setFormValues(anId: number, aName: string) {
    this.styleForm.controls.name.setValue(aName)
    this.styleForm.controls.id.setValue(anId)
  }

  edit(aStyle) {
    document.getElementById('style-title').scrollIntoView();
    this.setFormValues(aStyle.id, aStyle.name);
  }

  onSubmit(): void {
    if (!this.styleForm.valid) {
      return;
    }
    // Check if name already exists
    const styleName = this.styleForm.value.name.toUpperCase();
    let exists = false;
    const update = this.styleForm.value.id;
    this.collection.forEach(elem => {
      exists = exists || elem.name === styleName;
    });

    // Check if ID exists for update  
    if (update) {
      const updateStyle: BeerStyle = { id: this.styleForm.value.id, name: styleName };
      this.beerStyleService.updateStyle(updateStyle);
      this.styleForm.reset();
    } else if (!exists) {
      const aNewStyle: BeerStyle = { name: styleName };
      this.beerStyleService.addStyle(aNewStyle);
      this.styleForm.reset();
    } else {
      alert('Ya existe ese nombre');
    }
  }

}

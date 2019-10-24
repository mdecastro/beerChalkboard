import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrewerService } from './brewer.service';
import { BrewerInt, FileUploadModel } from './brewer.interface';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-brewer',
  templateUrl: './brewer.component.html',
  styleUrls: ['./brewer.component.scss']
})
export class BrewerComponent implements OnInit {

  brewerForm: FormGroup;
  brewers$: Observable<BrewerInt[]>;
  displayedColumns: string[] = ['name', 'city', 'logo', 'actions'];
  collection: Array<BrewerInt> = [];
  file: FileUploadModel;
  downloadURL: string = '';
  uploadProgress;

  constructor(private fb: FormBuilder, private brewerService: BrewerService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.brewerForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      logo: ['', Validators.required],
      img: [''],
      id: ['']
    });
    this.brewers$ = this.brewerService.getBrewers();
    this.brewerService.getCollection().subscribe(val => { this.collection = val; });
  }

  setFormValues(anId: number, aName: string, aCity: string, aLogo: string) {
    this.brewerForm.controls.name.setValue(aName)
    this.brewerForm.controls.city.setValue(aCity)
    this.brewerForm.controls.logo.setValue(aLogo)
    this.brewerForm.controls.id.setValue(anId)
  }

  delete(aBrewer: BrewerInt) {
    if (confirm('Seguro que querés borrar ' + aBrewer.name + '?')) {
      this.brewerService.deleteBrewer(aBrewer);
    }
  }

  edit(aBrewer) {
    this.setFormValues(aBrewer.id, aBrewer.name, aBrewer.city, aBrewer.logo);
    this.downloadURL = '';
  }

  onSubmit(): void {
    if (!this.brewerForm.valid) {
      return;
    }
    // Check if name already exists
    const brewerName = this.brewerForm.value.name.toUpperCase();
    let exists = false;
    const update = this.brewerForm.value.id;
    this.collection.forEach(elem => {
      exists = exists || elem.name === brewerName;
    });

    const aBrewer: BrewerInt = { name: brewerName, city: this.brewerForm.value.city, logo: this.brewerForm.value.logo };

    // Check if ID exists for update  
    if (update) {
      this.brewerService.updateBrewer({ id: this.brewerForm.value.id, ...aBrewer });
      this.brewerForm.reset();
    } else if (!exists) {
      this.brewerService.addBrewer(aBrewer);
      this.brewerForm.reset();
    } else {
      alert('Ya existe ese nombre');
    }
  }

  openImageUploader(e): void {
    e.preventDefault();
    const imageUploader = document.getElementById('imageUploader') as HTMLInputElement;
    imageUploader.onchange = () => {
      this.file = { data: imageUploader.files[0], state: 'in', inProgress: false, progress: 0, canRetry: false, canCancel: false };
      this.uploadFile();
    }
    imageUploader.click();
  }

  uploadFile(): void {
    const randomId = Math.random().toString(36).substring(2);
    let uploadTask = this.storage.ref(randomId).put(this.file.data);

    this.uploadProgress = uploadTask.percentageChanges();
    uploadTask.snapshotChanges()
      .pipe(
        finalize(() => {
          this.storage.ref(randomId).getDownloadURL().subscribe(anUrl => {
            this.brewerForm.controls.logo.setValue(anUrl);
            this.downloadURL = anUrl;
          })
        })
      ).subscribe();

  }

}

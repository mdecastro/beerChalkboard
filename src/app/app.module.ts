import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatTreeModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCardModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrewerComponent } from './brewer/brewer.component';
import { BeerStyleComponent } from './beer-style/beer-style.component';
import { BeerComponent } from './beer/beer.component'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BoardComponent } from './board/board.component';
import { BoardBeerComponent } from './board-beer/board-beer.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatProgressBarModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    MainPanelComponent,
    NavBarComponent,
    BrewerComponent,
    BeerStyleComponent,
    BeerComponent,
    BoardComponent,
    BoardBeerComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

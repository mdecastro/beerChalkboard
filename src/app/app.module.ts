import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

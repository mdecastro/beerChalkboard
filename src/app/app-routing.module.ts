import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { BrewerComponent } from './brewer/brewer.component';
import { BeerStyleComponent} from './beer-style/beer-style.component';
import { BeerComponent } from './beer/beer.component';
import { BoardComponent } from './board/board.component';
import { AuthGuardService as AuthGuard } from './login/auth-guard.service';

const routes: Routes = [
  { path: 'pizarra', component: BoardComponent},
  { path: 'login', component: LoginComponent},
  { 
    path: 'main-panel', 
    component: MainPanelComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'brewers',
        component: BrewerComponent
      },
      {
        path: 'styles',
        component: BeerStyleComponent
      },
      {
        path: 'beers',
        component: BeerComponent
      }
    ]
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BuyOffersComponent } from './buy-offers/buy-offers.component';
import { SellOffersComponent } from './sell-offers/sell-offers.component';
import { ResourcesComponent } from './resources/resources.component';
import { CompaniesComponent } from './companies/companies.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TestComponent } from './test/test.component';
import { ChartComponent } from './chart/chart.component';


const routes: Routes = [
  { path: 'selloffers', component: SellOffersComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'buyoffers', component: BuyOffersComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'test', component: TestComponent },
  { path: 'chart', component: ChartComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

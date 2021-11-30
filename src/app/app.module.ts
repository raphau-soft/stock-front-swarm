import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SellOffersComponent } from './sell-offers/sell-offers.component';
import { BuyOffersComponent } from './buy-offers/buy-offers.component';
import { ResourcesComponent } from './resources/resources.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompaniesComponent } from './companies/companies.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TestComponent } from './test/test.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    SellOffersComponent,
    BuyOffersComponent,
    ResourcesComponent,
    CompaniesComponent,
    TransactionsComponent,
    TestComponent,
    ChartComponent,
  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    MatTableModule,
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

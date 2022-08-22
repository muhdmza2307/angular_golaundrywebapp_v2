import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowCompanyComponent } from './_component/company/show-company/show-company.component';
import { SharedService } from 'src/app/_service/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppSettingService } from './app-setting.service';
import { GridviewComponent } from './_component/gridview/gridview.component';
import { LoginComponent } from './_component/account/login/login.component';
import { NavbarComponent } from './_component/navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    ShowCompanyComponent,
    GridviewComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService,
    DatePipe,
    AppSettingService,
    LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

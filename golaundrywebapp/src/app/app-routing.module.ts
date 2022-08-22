import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowCompanyComponent } from './_component/company/show-company/show-company.component';
import { LoginComponent } from './_component/account/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Company/CompanyList', component: ShowCompanyComponent},
  {path: 'Account/Login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

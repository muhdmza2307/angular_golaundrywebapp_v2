import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:60483/api";
  objSession: any;
  reqHeader: HttpHeaders = new HttpHeaders;


  constructor(private http:HttpClient) 
  {
      this.objSession = JSON.parse(localStorage.getItem('loginSess') || '""');
      //this.objSession = JSON.parse(localStorage.getItem('loginSess') !);
      this.setupHeader();
  }

  setupHeader()
  {
    this.reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.objSession['token']
    });
  }

  getCompList(): Observable<any> 
  {
    return this.http.post<any>(this.APIUrl + '/Company/GetCompanyList',  {}, { headers: this.reqHeader });
  }

  getMenuList(): Observable<any> 
  {
    return this.http.post<any>(this.APIUrl + '/Account/GetAccMenuPermission',  {userId : this.objSession['userId']}, { headers: this.reqHeader });
  }

  login(userName: string, password: string): Observable<any> 
  {
    return this.http.post<any>(this.APIUrl + '/Account/Login',  {userName : userName, password : password});
  }
}

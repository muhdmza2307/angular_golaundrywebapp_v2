import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {

  constructor(private http: HttpClient) { }

  public getJSONforTableHeader(): Observable<any> {
    return this.http.get("./assets/tableheader.json");
  }
}

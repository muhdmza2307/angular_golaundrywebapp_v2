import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';
import { DatePipe } from '@angular/common';
import { AppSettingService } from 'src/app/app-setting.service';

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.css']
})
export class ShowCompanyComponent implements OnInit {

  constructor(private service: SharedService, private datepipe: DatePipe, private appSetService: AppSettingService) 
  { 
    
  }

  CompanyList:any=[];

  ngOnInit(): void {
    this.refreshCompanyList();  
  }

   refreshCompanyList(){    
      this.service.getCompList().subscribe(result =>{
        this.CompanyList = result.data;
     });
   }   

}


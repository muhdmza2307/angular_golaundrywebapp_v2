import { Component, OnInit, Input } from '@angular/core';
import { AppSettingService } from 'src/app/app-setting.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})


export class GridviewComponent implements OnInit {

  constructor(private appSetService: AppSettingService, private datepipe: DatePipe) { }

  @Input() passModuleName: string = "";
  @Input() passSubModuleName: string = "";

  @Input() passColumnHide: string = "";
  @Input() passIsCheckBoxRequired: boolean = false;
  @Input() passColumnWidth: string = "";
  @Input() passColumnNoSort: string = "";

  @Input() passDataSource: any = [];

  @Input() passIsActionRequired: boolean = true;
  @Input() passActionSetup: string = "";
  
  HeaderList = new Map<string, string>();
  ColumnHide: string[] = [];
  ColumnWidth: string[] = [];
  ColumnNoSort: string[] = [];
  ActionSetup: string[] = [];
  colNameCheck: string[] = ["isparent", "isactive"];


  ngOnInit() {
    this.getTableHeaderList();
    this.ColumnHide = this.passColumnHide.split(",");
    this.ColumnWidth = this.passColumnWidth.split(",");
    this.ColumnNoSort = this.passColumnNoSort.split(",");
  }

  getTableHeaderList(){
    this.appSetService.getJSONforTableHeader().subscribe(result => {
      let head = result[this.passModuleName][this.passSubModuleName] as any[];
      head.forEach(element => {
        this.HeaderList.set(Object.keys(element)[0], element[Object.keys(element)[0]]);
      });
    })
  }

  isObjectContainKey(keyLabel: string, e: Map<string, string>) {
    return e.has(keyLabel);
  }

  isObjectColHide(inp: number) {
    return this.ColumnHide.some(word => inp.toString().includes(word));
  }

  getColWidth(count: number){
    return "width:" + this.ColumnWidth[count];
  }

  getColHeadLabel(keyLabel: string){
    return this.HeaderList.get(keyLabel);
  }

  getSourceArrayObjProp(src: any) {
    return src.length < 1 ? [] : Object.keys(src[0]); 
  }

  isContainsSubString(str : string, substr : string){
    return str.toLowerCase().includes(substr);
  }

  isContainsSubStringArray(str : string) {
    return this.colNameCheck.some(word => str.toLowerCase().includes(word));
  }

  convertStatusToStr(input:boolean){
    let output:string = "";

    if (input == true)
        output = "Active";
    else if (input == false)
        output = "Inactive";

    return output;
  }

  dateTimeDisplayFormat(input:string){
    let date = new Date(input);
    return this.datepipe.transform(date, 'd/M/yyyy h:mm:ss');
  }

}

import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  objMenuList: any = {};
  comparedUrls = ['/','/login'];
  currentUrl: string = '';

  constructor(private service: SharedService, private router: Router) {
    this.menuListSetup();
  }

  ngOnInit(): void {
  }

  menuListSetup()
  {   
    if (JSON.parse(localStorage.getItem('menuSess') !) != null)
      this.objMenuList = JSON.parse(localStorage.getItem('menuSess') !);
    else{
      this.service.getMenuList().subscribe(result =>{
        this.objMenuList = result.data;
        localStorage.setItem('menuSess', JSON.stringify(result.data));
      });
    }  
  }

  genDynamicMenuBar()
  {
    let htmlStr = [];
    let menuUrlLink: string;
    let menuIcon: string;

    for (let i = 0; i < this.objMenuList['parentMenuList'].length; i++)
    {
        let printStartChild: boolean = true;
        let printEndChild: boolean = false;
        let pMenuName: string = this.objMenuList['parentMenuList'][i]['menuName'];
        menuUrlLink = this.objMenuList['parentMenuList'][i]['menuUrlLink'] == "" ? "javascript:void(0)" : this.objMenuList['parentMenuList'][i]['menuUrlLink'];
        menuIcon = this.objMenuList['parentMenuList'][i]['menuIcon'];

        htmlStr.push("<li class='sidebar-item'>");
        htmlStr.push("<a class='sidebar-link has-arrow waves-effect waves-dark' href='" + menuUrlLink + "' aria-expanded='false'><i class='" + menuIcon + "'></i><span class='hide-menu'>" + pMenuName + "</span></a>");

        for (let j = 0; j < this.objMenuList['childMenuList'].length; j++)
        {
          let cMenuName: string = this.objMenuList['childMenuList'][j]['menuName'];
          menuUrlLink = this.objMenuList['childMenuList'][j]['menuUrlLink'] == "" ? "javascript:void(0)" : this.objMenuList['childMenuList'][j]['menuUrlLink'];
          menuIcon = this.objMenuList['childMenuList'][j]['menuIcon'];

          if((this.objMenuList['parentMenuList'][i]['menuId'] == this.objMenuList['childMenuList'][j]['parentMenuId']) && this.objMenuList['childMenuList'][j]['isShown'])
          {
            if (printStartChild)
            {
                printEndChild = true;
                htmlStr.push("<ul aria-expanded='false' class='collapse first-level'>");
            }

            htmlStr.push("<li class='sidebar-item'><a href='" + menuUrlLink + "' class='sidebar-link'><i class='" + menuIcon + "'></i><span class='hide-menu'>" + cMenuName + "</span></a></li>");
            printStartChild = false;
          }
        }

        if (printEndChild)
        {
          htmlStr.push("</ul>");
        }

        htmlStr.push("</li>");
    }

    return htmlStr.join("");
  }

}

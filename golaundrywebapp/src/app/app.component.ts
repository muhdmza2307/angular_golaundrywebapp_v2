import { Component } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';
import { Router} from '@angular/router';
import { LoginComponent } from './_component/account/login/login.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'golaundrywebapp';
  comparedUrls = ['/','/login'];
  currentUrl: string = '';
  objMenuList: any = {};

  constructor(private service: SharedService, private router: Router, protected login: LoginComponent)
  {
    this.getCurrentUrl(); 
  }

 getCurrentUrl()
  {
    this.router.events.subscribe(value => {
        this.currentUrl = this.router.url.toString();
    });
  }

  isComparedRoute() {
		if (!this.currentUrl) {
			return true;
		}
		const index = this.comparedUrls.indexOf(this.currentUrl);
		if (index >= 0) {
			return true;
		} else {
			return false;
		}
	}
}

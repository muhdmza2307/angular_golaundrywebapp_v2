import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import * as moment from "moment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

 /*  userName: string = "laundry123_ADMIN";
  passWord: string = "daef4953b9783365cad6615223720506cc46c5167cd16ab500fa597aa08ff964eb24fb19687f34d7665f778fcb6c5358fc0a5b81e1662cf90f73a2671c53f991"; */

  constructor(private service: SharedService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    //this.loginSubmit(); 
  }

  loginSubmit()
  {
    debugger;
    const val = this.loginForm.value;

    if (val.username && val.password) {
        this.service.login(val.username, val.password).subscribe(result => {
          console.log('hi');
          console.log(result.meta.respCode == "200");
          if(result.meta.respCode == "200"){
            localStorage.setItem('loginSess', JSON.stringify(result.data));
            this.router.navigateByUrl('/Company/CompanyList');
          }
        });
    }
    /* this.service.login(this.f.username.value, this.passWord).subscribe(result =>{
      localStorage.setItem('loginSess', JSON.stringify(result.data));
      //console.log(JSON.parse(localStorage.getItem('loginSess') || ''));
    }); */
  }

  public isLoggedIn() {
    console.log(11111);
    console.log(moment().isBefore(this.getExpiration()));
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const objSession = JSON.parse(localStorage.getItem('loginSess') || '""');   
    let expiresAt = objSession['tokenExpires'];
    expiresAt = moment().add(expiresAt,'second');
    //console.log(moment().add(expiresAt,'second'));
    console.log('hi '+ moment());
    console.log('hi2 '+ moment(expiresAt));
    return moment(expiresAt);
  }    
}

import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { userModel } from 'src/app/models/userModel';
import { Router } from '@angular/router';
import { take, map, first } from 'rxjs/operators';
import { Subscription, Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.styl']
})
export class LoginPageComponent implements OnInit {
/**************************************Constructor**************************************/
constructor(
  private authService:UserAuthService,
  private router: Router,
  private http: HttpClient

) { }
/**************************************Properties**************************************/
user: userModel;
private allSubscription = new Subscription();
 httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};
public invalidUser=false;
public hideShowIcon= 'visibility_off';
public hideShowType = 'password';
/**************************************Methods**************************************/
  ngOnInit() { 
    this.user = {userName:null, password:null};
  }

  login(user){

    this.authService.loginUser(user).subscribe((response) =>{
        console.log(response);
        if(response.message === 'Unauthorised user'){
          this.invalidUser = true;
        }
        else{
          console.log('true user');
          let userId = this.authService.user;
          this.router.navigate(['/dashboard'], {queryParams: { id: userId.id }});

        }
    }, (error)=> {
      console.log(error);

    });
  }
  hideShow(type){
    this.hideShowIcon = type=== 'visibility_off' ? 'visibility' : 'visibility_off';
    this.hideShowType = type==='visibility_off' ? 'text' : 'password';

  }
}

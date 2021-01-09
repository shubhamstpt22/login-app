import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.styl']
})
export class RegistrationPageComponent implements OnInit {
/**************************************Constructor**************************************/

  constructor(
    private authService: UserAuthService,
    private activatedRoute: ActivatedRoute

  ) {}
/**************************************Properties**************************************/
param:any;
loadData:boolean;
user;
duplicateEntry:boolean=null;
displayMsg = '';
/**************************************Methods**************************************/

  ngOnInit() {
    this.user={};
  }

  /* registration of new user */
  registerUser(){

    /* creating random key for id */
    var d = new Date();
    var n = d.getTime();
    this.user.id = n;

    this.authService.addUser(this.user).subscribe((response:any)=> {
      console.log(response);
      this.displayMsg = response.msg;
      if(response.msg!=='User Successfully Added'){
        this.duplicateEntry = true;
        this.user= {};
      }
      else{
        this.duplicateEntry= false;
      }
    });

  }

  /* checking for change event in input field */
  changEvent(){
    this.duplicateEntry =null;
  }

}

import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.styl']
})
export class UserDashboardComponent implements OnInit {
/**************************************Constructor**************************************/

constructor(
  private authService: UserAuthService,
  private activatedRoute: ActivatedRoute,
  private router: Router

) {}
/**************************************Properties**************************************/
param:any;
loadingData:boolean;
userData:any;
/**************************************Methods**************************************/

ngOnInit() {
  this.loadingData===true;
   this.param = this.activatedRoute.snapshot.queryParams;
  this.getUserData();
}

/* Check for user data with id from route */ 
getUserData(){
  this.authService.getUserDetailsById(this.param.id).subscribe(data =>{
    console.log(data);
    this.userData = data;
    this.loadingData===false;
  });
}

/* logging out and navigating to login pages */ 
logout(){
  this.router.navigate(['login'])
}
}

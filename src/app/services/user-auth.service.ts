import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { take, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
/**************************************Constructor**************************************/

constructor(
 private http: HttpClient,
 private router:Router
 ) { }


/**************************************Properties**************************************/
// API_KEY = 'YOUR_API_KEY';

// userData = [{id:'12345', userName: 'ankit', password:'ankit', firstName:'Ankit', lastName:'Satpute'},
//             {id:'34567', userName: 'smita', password:'smita', firstName:'Smita', lastName:'Patil'}]
user;
            userData = JSON.parse(localStorage.getItem('userData')) || [];

/**************************************Methods**************************************/


loginUser(user):Observable<any>{
  for(let i=0; i<this.userData.length; i++){
    if(this.userData[i].userName===user.userName && this.userData[i].password === user.password){
      // let response = {status:true, message:'authorised user', id:this.userData[i].id};
      // return of(response);
      return this.http.post<any>(`https://demo7653731.mockable.io/login_success`,{user}).pipe((response:any)=>{ 
        if(response){
          this.user = this.userData[i];
          return response;
        }
      });
    
    }

  }
  return this.http.post<any>(`https://demo7653731.mockable.io/login_fail`,{user}).pipe((response:any)=>{
    if(response){
      return response;
    }
  });



}
addUser(user){
  for(let i=0; i<this.userData.length; i++){
    if(user.firstName === this.userData[i].firstName && user.lastName === this.userData[i].lastName){
      console.log('user already exist');
      return this.http.post<any>(`https://demo7653731.mockable.io/add_fail`,{}).pipe((response:any)=>{
        return response;
      });
    }
  }
  this.userData.push(user);
  localStorage.setItem('userData', JSON.stringify(this.userData));
  // this.router.navigate(['login']);
  return this.http.post<any>(`https://demo7653731.mockable.io/new_add`,{}).pipe((response:any)=>{
    return response;
  });

}


getUserDetailsById(id){
  let index;
  for(let i=0; i<this.userData.length; i++){
    if(this.userData[i].id == id){
      index = i;
    }
  }
  console.log(index);
  // localStorage.setItem('userData', JSON.stringify(this.userData));
  let data = JSON.parse(localStorage.getItem('userData'));
  let sendData = _.cloneDeep(data[index]);
  delete sendData.userName;
  delete sendData.password;
  return of(sendData);
}



}

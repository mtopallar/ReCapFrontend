import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'https://localhost:44398/api/auth/';

  login(user:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl+"login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,user)
  }

  register(user:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl+"register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,user)    
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true
    }else{
      return false
    }
  } 

  
}

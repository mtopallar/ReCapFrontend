import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'https://localhost:44398/api/users/';

  getUserByMail(email:string):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"getbyemail?email="+email
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  updateUser(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,user)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailWithImageResponseModel } from '../models/carDetailsWithImageResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailWithImageService {

  apiUrl = "https://localhost:44398/api/cars/getcarimagedetails"

  constructor(private httpClient:HttpClient) { }

  getCarDetails(carId:number):Observable<CarDetailWithImageResponseModel>{
return this.httpClient.get<CarDetailWithImageResponseModel>(this.apiUrl+"?carId="+carId)
  }
}

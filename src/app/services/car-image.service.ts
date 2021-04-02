import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44398/api/CarImages/"

  constructor(private httpClient:HttpClient) { }

  // getCarMainImageByCarId(carId:number):Observable<SingleResponseModel<CarImage>>{
  //   let newPath = this.apiUrl+"getcarmainimagebycarid?carId="+carId;
  //   return this.httpClient.get<SingleResponseModel<CarImage>>(newPath)
  // }

  getImageListByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"getimagelistbycarId?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
}

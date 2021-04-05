import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailWithMainImageDto } from '../models/carDetailWithMainImageDto';
import { CarDetailWithoutAnyImageDto } from '../models/carDetailWithoutAnyImageDto';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44398/api/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDetailWithMainImageDto>> {
    let newPath = this.apiUrl + 'cars/getcarsdetails';
    return this.httpClient.get<ListResponseModel<CarDetailWithMainImageDto>>(newPath);
  }

  getCarDetailDtoByCarId(carId:number):Observable<SingleResponseModel<CarDetailWithoutAnyImageDto>>{
    let newPath = this.apiUrl+"cars/getcardetailsbycarid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<CarDetailWithoutAnyImageDto>>(newPath);
  }

  getCarsByBrandId(brandId: number): Observable<ListResponseModel<CarDetailWithMainImageDto>> {
    let newPath =
      this.apiUrl + 'cars/getcarsdetailsbybrandid?brandId=' + brandId;

    return this.httpClient.get<ListResponseModel<CarDetailWithMainImageDto>>(newPath);
  }

  getCarsByColorId(colorId: number): Observable<ListResponseModel<CarDetailWithMainImageDto>> {
    let newPath =
      this.apiUrl + 'cars/getcarsdetailsbycolorid?colorId=' + colorId;

    return this.httpClient.get<ListResponseModel<CarDetailWithMainImageDto>>(newPath);
  }

  getCarsByBrandIdAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<CarDetailWithMainImageDto>>{
    let newPath=this.apiUrl+"cars/getcarsdetailsbybrandidandcolorid?brandId="+brandId+"&&colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetailWithMainImageDto>>(newPath);
  }

  //Test
  getImageByImageIdTest(id:number):Observable<SingleResponseModel<CarImage>>{
    let path= this.apiUrl+"carimages/getimagebyid?id="+id
    return this.httpClient.get<SingleResponseModel<CarImage>>(path);
  }
}

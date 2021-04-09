import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44398/api/rentals/";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDto>>{
    let newPath=this.apiUrl+"getrentalsdetailslist"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath)
  }

  addRental(rental:Rental):Observable<Rental>{
    let newPath = this.apiUrl+"add"
    // const httpOptions={
    //   header: new HttpHeaders({
    //     'Content-Type':'application/json',
    //     'Authorization':'Token'
    //   })
    // }
    return this.httpClient.post<Rental>(newPath, rental)
  }

  checkRentability(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl+"checkrentability"
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
}

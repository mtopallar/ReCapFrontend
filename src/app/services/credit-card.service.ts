import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { CreditCardDto } from '../models/creditCardDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'https://localhost:44398/api/creditcards/'

  getCustomerCardListByCustomerId(customerId:number):Observable<ListResponseModel<CreditCardDto>>{
    let newPath=this.apiUrl+"getcustomercardlistbycustomerid"+customerId
    return this.httpClient.get<ListResponseModel<CreditCardDto>>(newPath)
  }

  getCustomerSelectedCardByCustomerId(customerId:number):Observable<SingleResponseModel<CreditCardDto>>{
    let newPath= this.apiUrl+"getcustomerselectedcardbycustomerid"+customerId
    return this.httpClient.get<SingleResponseModel<CreditCardDto>>(newPath);
  }
  addCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath= this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  deleteCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }
}

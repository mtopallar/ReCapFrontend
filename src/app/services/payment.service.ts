import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'https://localhost:44398/api/payments/payment';

  pay():Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl)
  }
}

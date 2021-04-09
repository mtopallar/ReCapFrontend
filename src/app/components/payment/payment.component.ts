import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardType } from 'src/app/models/creditCardType';
import { CreditCardTypeService } from 'src/app/services/credit-card-type.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder, 
    private activatedRoute:ActivatedRoute,
    private cardTypeService:CreditCardTypeService,
    private toastrService:ToastrService) { }

  creditCardForm:FormGroup;
  creditCard:CreditCard;
  creditCardTypes: CreditCardType[];
  selectedCardType: number
  dataLoadedForCardTypes=false  
  years: number[]=[];
  months:number[]=[];
  

  ngOnInit(): void {
    this.getCardTypes();
    this.createCreditCardForum();
    this.getYears()
    this.getMoths()
  }
 

  createCreditCardForum(){
    this.creditCardForm=this.formBuilder.group({
      customerId:["",Validators.required],      
      cardTypeId:["",Validators.required],
      cardNumber:["",[Validators.required,Validators.min(1000000000000000),Validators.max(9999999999999999)]],
      firstNameOnTheCard:["",Validators.required],
      lastNameOnTheCard:["",Validators.required],
      expirationMonth:["",[Validators.required,Validators.min(1),Validators.max(12)]],
      expirationYear:["",[Validators.required,Validators.min(2021),Validators.max(2050)]],
      cvv:["",[Validators.required,Validators.min(100),Validators.max(999)]],
      selectedCard:[]
    })
  }

  getCardTypes(){
    this.cardTypeService.getAllCardTypes().subscribe(response=>{
      this.creditCardTypes=response.data
      this.dataLoadedForCardTypes=true;
    })
  }

  getYears(){
    for(let i=2021; i<=2050; i++ ){
      this.years.push(i)      
    }    
  }
  getMoths(){
    for(let i=1; i<13; i++ ){
      this.months.push(i);
    }    
  }

  sendCard(){
    console.log("metod çalıştı") 
    this.creditCard=Object.assign({}, this.creditCardForm.value)      
    console.log(this.creditCardForm.value)      
    if(this.creditCardForm.valid){     
    }
  }
}

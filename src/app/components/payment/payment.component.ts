import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardType } from 'src/app/models/creditCardType';
import { CreditCardTypeService } from 'src/app/services/credit-card-type.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

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
    private toastrService:ToastrService,
    private creditCardService:CreditCardService,
    private paymentService:PaymentService) { }

  creditCardForm:FormGroup;
  creditCard:CreditCard;
  creditCardTypes: CreditCardType[];
  dataLoadedForCardTypes=false  
  years: number[]=[];
  months:number[]=[];
  saveMyCard=false;
  

  ngOnInit(): void {
    this.getCardTypes();
    this.createCreditCardForm();    
  }
 

  createCreditCardForm(){    
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

  sendCard(){
    console.log("metod çalıştı") 
    this.creditCard=Object.assign({}, this.creditCardForm.value)          
    if(this.creditCardForm.valid){
      this.paymentService.pay().subscribe(response=>{
        if(response.success){
          this.toastrService.success(response.message,"şimdi kira çalışcak")
          
          //this.rentalService.addRental(rental)
        }
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
      if(this.saveMyCard){
        
        //this.creditCardService.addCreditCard(this.creditCard)
      }  
         
    }
  }
}

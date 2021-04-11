import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailWithoutAnyImageDto } from 'src/app/models/carDetailWithoutAnyImageDto';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardType } from 'src/app/models/creditCardType';
import { Rental } from 'src/app/models/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarService } from 'src/app/services/car.service';
import { CreditCardTypeService } from 'src/app/services/credit-card-type.service';
import { FindexService } from 'src/app/services/findex.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-this-car',
  templateUrl: './rent-this-car.component.html',
  styleUrls: ['./rent-this-car.component.css'],
})
export class RentThisCarComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private cardTypeService: CreditCardTypeService,
    private paymentService: PaymentService,
    private findeksService:FindexService
  ) {}

  rentalAddForm: FormGroup;
  rental: Rental;
  carDetailDto: CarDetailWithoutAnyImageDto;
  carDetailDtoDataLoaded = false;
  rentabilityResponse: ResponseModel;
  rentabilityErrorMessage: string;
  rentabilitySuccessMessage:string
  isItRentable: boolean;
  totalRentDay:any

  creditCardForm: FormGroup;
  creditCard: CreditCard;
  creditCardTypes: CreditCardType[];
  dataLoadedForCardTypes = false;
  years: number[] = [];
  months: number[] = [];
  saveMyCard = false;
  findeksPointEnough:boolean
  findeksResponseModel:ResponseModel

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({      
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetails(params['carId']);
    });
    this.createRentalAddForm();
    this.getCardTypes();
    this.createCreditCardForm();
  }

  checkFindeksPoint(customerId:number){
    this.findeksService.getFindexByCustomerId(customerId).subscribe(response=>{
      this.findeksPointEnough=true;
      this.findeksResponseModel.message=response.message
      this.toastrService.success(response.message,"Başarılı")      
    },responseError=>{
      this.findeksPointEnough=false;
      this.toastrService.error(responseError.error,"Hata")
    })
  }

  checkRentability() {
    this.isItRentable = null;
    this.add();
    this.checkFindeksPoint(this.rental.customerId)    
    this.isItRentable = undefined;
    this.rentalService.checkRentability(this.rental).subscribe(
      (response) => {
        this.isItRentable = true;
        this.rentabilityResponse = response;
        if (this.rentabilityResponse.success) {
          console.log(this.rentabilityResponse.message);
          this.rentabilitySuccessMessage=this.rentabilityResponse.message
        }
      },
      (responseError) => {
        this.rentabilityResponse = responseError;
        this.rentabilityErrorMessage = responseError.error.message;
        this.isItRentable = false;
        //console.log(responseError.error.message)
      }
    );
  }
  

  add() {
    if (this.rentalAddForm.valid) {
      this.rental = Object.assign({}, this.rentalAddForm.value);
      this.rental.carId = this.carDetailDto.carId;
    }    
    this.rentalService.addRental(this.rental).subscribe(data=>{
      this.toastrService.success(this.carDetailDto.brandName +" "+this.carDetailDto.carName,"Başarıyla Kiralandı")
    },responseError=>{
      this.toastrService.error(responseError.error.message)
    }
    )
  }
  getCarDetails(carId: number) {
    this.carService.getCarDetailDtoByCarId(carId).subscribe((response) => {
      this.carDetailDto = response.data;
      this.carDetailDtoDataLoaded = true;
    });
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      cardTypeId: ['', Validators.required],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.min(1000000000000000),
          Validators.max(9999999999999999),
        ],
      ],
      firstNameOnTheCard: ['', Validators.required],
      lastNameOnTheCard: ['', Validators.required],
      expirationMonth: [
        '',
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      expirationYear: [
        '',
        [Validators.required, Validators.min(2021), Validators.max(2050)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.min(100), Validators.max(999)],
      ],
      selectedCard: [],
    });
  }

  getCardTypes() {
    this.cardTypeService.getAllCardTypes().subscribe((response) => {
      this.creditCardTypes = response.data;
      this.dataLoadedForCardTypes = true;
    });
  }

  sendCard() {
    console.log('metod çalıştı');
    this.creditCard = Object.assign({}, this.creditCardForm.value);
    if (this.creditCardForm.valid) {
      this.paymentService.pay().subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(response.message, 'şimdi kira çalışcak');

            //this.rentalService.addRental(rental)
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
      if (this.saveMyCard) {
        //this.creditCardService.addCreditCard(this.creditCard)
      }
    }
  }
}

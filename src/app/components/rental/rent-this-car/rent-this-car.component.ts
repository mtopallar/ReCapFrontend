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
    private findeksService: FindexService
  ) {}

  rentalAddForm: FormGroup;
  rental: Rental;
  carDetailDto: CarDetailWithoutAnyImageDto;
  carDetailDtoDataLoaded = false;  
  rentabilityErrorMessage: string;
  rentabilitySuccessMessage: string;
  isItRentable: boolean;
  totalRentDay: any;

  creditCardForm: FormGroup;
  creditCard: CreditCard;
  creditCardTypes: CreditCardType[];
  dataLoadedForCardTypes = false;
  years: number[] = [];
  months: number[] = [];
  saveMyCard = false;
  
  findeksEnoughMessage:string
  findeksNotEnoughMessage:string
  enoughFindexPoint:boolean

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

  checkFindeksPoint() {
      
    this.findeksService.getFindexByCustomerId(this.rental.customerId).subscribe(
      (response) => {
        if(response.data.score<this.carDetailDto.minFindeksScore){
          this.findeksNotEnoughMessage="Bu aracı kiralayabilmek için yeterli findeks puanınız yok"
          this.toastrService.error(this.findeksNotEnoughMessage,"Hata")          
          this.enoughFindexPoint=false
        }else{ 
          this.findeksEnoughMessage="Bu aracı kiralayabilmek için Findeks puanınız yeterli"
          this.enoughFindexPoint=true      
          this.toastrService.success(this.findeksEnoughMessage)           
        }        
      },
      (responseError) => {
             
        this.toastrService.error(responseError.error, 'Hata');
      }
    );
  }

  checkRentability() {
    this.isItRentable = null;
    this.isItRentable = undefined;
    if (this.rentalAddForm.valid) {
      let rentalModel: Rental = Object.assign({}, this.rentalAddForm.value);
      rentalModel.carId = this.carDetailDto.carId;
      this.rental = rentalModel
      this.checkFindeksPoint();
      this.rentalService.checkRentability(rentalModel).subscribe(
        (response) => {
          this.isItRentable = true;          
          if (response.success) {            
            this.rentabilitySuccessMessage = response.message;
          }
        },
        (responseError) => {
          this.rentabilityErrorMessage = responseError.error.message;
          this.isItRentable = false;
        }
      );
    }
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

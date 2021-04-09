import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailWithoutAnyImageDto } from 'src/app/models/carDetailWithoutAnyImageDto';
import { Rental } from 'src/app/models/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-this-car',
  templateUrl: './rent-this-car.component.html',
  styleUrls: ['./rent-this-car.component.css']
})
export class RentThisCarComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
    private toastrService:ToastrService
    ) { }

  rentalAddForm:FormGroup;
  rental:Rental;
  carDetailDto:CarDetailWithoutAnyImageDto;
  carDetailDtoDataLoaded=false
  rentabilityResponse:ResponseModel;
 

  createRentalAddForm(){
    this.rentalAddForm=this.formBuilder.group({
      //carId:["",Validators.required],
      //carId:this.carDetailDto.carId,
      customerId:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required]
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCarDetails(params["carId"]);
    })
    this.createRentalAddForm()    
  }

  checkRentability(){
    this.add();
    this.rentalService.checkRentability(this.rental).subscribe(response=>{
      this.rentabilityResponse=response      
      if(this.rentabilityResponse.success){
        console.log(this.rentabilityResponse.message)
      }
    },responseError=>{
      console.log(responseError.error.message)
    })
  }

  add(){
    if(this.rentalAddForm.valid){
      this.rental=Object.assign({}, this.rentalAddForm.value)
      this.rental.carId=this.carDetailDto.carId      
    }
    console.log("add metodundan"+this.rental.carId,this.rental.customerId,this.rental.rentDate,this.rental.returnDate)
      // this.rentalService.addRental(this.rental).subscribe(data=>{
      //   this.toastrService.success(this.carDetailDto.brandName +" "+this.carDetailDto.carName,"Başarıyla Kiralandı")
      // },responseError=>{
      //   this.toastrService.error(responseError.error.message)        
      // }
      // )
  }
  getCarDetails(carId:number){
    this.carService.getCarDetailDtoByCarId(carId).subscribe(response=>{
      this.carDetailDto=response.data;  
      this.carDetailDtoDataLoaded=true    
    })
  }

}

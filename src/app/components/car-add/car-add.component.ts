import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService
  ) {}

  carAddForm: FormGroup;
  //cartoAdd: Car;

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm() {   
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear:["",[Validators.required,Validators.min(1500)]],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }

  addCar() {
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
       this.carService.addCar(carModel).subscribe(response=>{ 
         console.log(response)        
         this.toastrService.success(response.message,"Başarılı")         
       })       
    }else{      
      this.toastrService.error("Giriş yaptığınız bilgileri kontrol ediniz.","Dikkat")
    }
    
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailWithMainImageDto } from 'src/app/models/carDetailWithMainImageDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-admin',
  templateUrl: './car-admin.component.html',
  styleUrls: ['./car-admin.component.css']
})
export class CarAdminComponent implements OnInit {

  constructor(
    private carService:CarService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
  ) { }

  selectedCar:Car;
  carToUpdated:Car;
  allCars:CarDetailWithMainImageDto[];
  selectedCarDataLoaded=false;
  selectionforAdd:boolean =true
  selectionForEdit:boolean =false
  imageUrl: string = 'https://localhost:44398/CarImages/';
  
  carUpdateForm:FormGroup
  carAddForm: FormGroup;
  
  selectionAdd(selection:boolean){
    this.selectionforAdd=selection;
    this.selectionForEdit=false;
    this.selectedCarResetter(false)    
  }
  selectionEdit(selection:boolean){
    this.selectionforAdd=false;
    this.selectionForEdit=selection    
  }

  ngOnInit(): void {
    this.getAllCarsDto();
    this.createCarUpdateForm();
    this.createCarAddForm();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', [Validators.required]],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', [Validators.required, Validators.min(1500)]],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  deleteCar(id:number){
    let carToDelete:Car;
    this.carService.getCarByCarId(id).subscribe(response=>{
      carToDelete=response.data
       this.carService.deleteCar(carToDelete).subscribe(response=>{
      this.toastrService.success(response.message,"Silindi")
    },responseError=>{
      this.toastrService.error(responseError.message)
    })
    },responseError=>{
      this.toastrService.error("Belirtilen araca ulaşılamadı","Hata")
    })   
   
    }
  

  addCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.carUpdateForm.reset()
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }         
      );
    } else {
      this.toastrService.error(
        'Giriş yaptığınız bilgileri kontrol ediniz.',
        'Dikkat'
      );
    }
  }

  getSelectedCar(carId:number){
    this.carService.getCarByCarId(carId).subscribe(response=>{
      this.selectedCar=response.data;
      this.selectedCarDataLoaded=true;
      //console.log(this.selectedCar)      
    })
  }

  selectedCarResetter(newValue:boolean){    
    this.selectedCarDataLoaded=newValue;
  }

  updateCar(carId:number) {
    this.getSelectedCar(carId);
    if (this.carUpdateForm.valid) {
      let carModelToUpdate = Object.assign({}, this.carUpdateForm.value);
      carModelToUpdate.id = this.selectedCar.id;      
      this.carService.updateCar(carModelToUpdate).subscribe(response=>{
        this.toastrService.success(response.message, 'Başarılı');
        this.selectedCarResetter(false)
        this.carUpdateForm.reset()
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }      
      )           
    }else {
      this.toastrService.error(
        'Giriş yaptığınız bilgileri kontrol ediniz.',
        'Dikkat'
      );
    }      
  }


  getAllCarsDto(){
    this.carService.getCarsDto().subscribe(response=>{
      this.allCars=response.data;
    })
  }
  
  
}

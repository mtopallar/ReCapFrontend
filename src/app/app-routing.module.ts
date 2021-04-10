import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAdminComponent } from './components/brand-admin/brand-admin.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarAdminComponent } from './components/car-admin/car-admin.component';
import { CarDetailWithImageComponent } from './components/car-detail-with-image/car-detail-with-image.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { RentThisCarComponent } from './components/rental/rent-this-car/rent-this-car.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetails/:carId",component:CarDetailWithImageComponent},
  {path:"rentals",component:RentalComponent},
  {path:"rentcar/carId/:carId",component:RentThisCarComponent},
  {path:"cars/add",component:CarAddComponent},  
  {path:"colors/add",component:ColorAddComponent},
  {path:"admin/cars",component:CarAdminComponent},
  {path:"admin/brands",component:BrandAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

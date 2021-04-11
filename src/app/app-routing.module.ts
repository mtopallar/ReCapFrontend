import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAdminComponent } from './components/brand-admin/brand-admin.component';
import { CarAdminComponent } from './components/car-admin/car-admin.component';
import { CarDetailWithImageComponent } from './components/car-detail-with-image/car-detail-with-image.component';
import { CarComponent } from './components/car/car.component';
import { ColorAdminComponent } from './components/color-admin/color-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentThisCarComponent } from './components/rental/rent-this-car/rent-this-car.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetails/:carId",component:CarDetailWithImageComponent},
  {path:"rentals",component:RentalComponent},
  {path:"rentcar/carId/:carId",component:RentThisCarComponent},
  {path:"admin/cars",component:CarAdminComponent, canActivate:[LoginGuard]},
  {path:"admin/brands",component:BrandAdminComponent,canActivate:[LoginGuard]},
  {path:"admin/colors",component:ColorAdminComponent,canActivate:[LoginGuard]},
  {path:"user",component:UserComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

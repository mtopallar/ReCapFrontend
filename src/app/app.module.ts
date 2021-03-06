import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms" //2way binding için
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailWithImageComponent } from './components/car-detail-with-image/car-detail-with-image.component';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { CarNameFilterPipePipe } from './pipes/car-name-filter-pipe.pipe';

import{ToastrModule} from "ngx-toastr";
import { RentThisCarComponent } from './components/rental/rent-this-car/rent-this-car.component';
import { BrandAdminComponent } from './components/brand-admin/brand-admin.component';
import { CarAdminComponent } from './components/car-admin/car-admin.component';
import { ColorAdminComponent } from './components/color-admin/color-admin.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CarComponent,
    RentalComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    CarDetailWithImageComponent,
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    CarNameFilterPipePipe,
    RentThisCarComponent,
    BrandAdminComponent,
    CarAdminComponent,
    ColorAdminComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, //reactive forms da [formGroup] için
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

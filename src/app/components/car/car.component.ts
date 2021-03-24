import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetailDto } from 'src/app/models/carDetailDto';

import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetailDto: CarDetailDto[] = [];
  currentCar:CarDetailDto;  
  carNameFilterText="";
  brands:Brand[];
  colors:Color[];

  constructor(
    private carService: CarService,
    private brandService:BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);        
      }
      else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);        
      } else {
        this.getCars();        
      }
    });
    this.getBrandsFromBrandService();
    this.getColorsFromColorService();
  }
  getCurrentCarClass(car:CarDetailDto){
    if(car==this.currentCar){
      return "table-success"
    }else{
      return "table"
    }
  }
  setCurrentCar(car:CarDetailDto){
    this.currentCar=car
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.carDetailDto = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetailDto = response.data;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.carDetailDto = response.data;
    });
  }

  getBrandsFromBrandService(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands=response.data;
    })
  }
  getColorsFromColorService(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors=response.data;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetailWithMainImageDto } from 'src/app/models/carDetailWithMainImageDto';
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
  carDetailDto: CarDetailWithMainImageDto[] = [];
  imageUrl: string = 'https://localhost:44398/CarImages/';
  carNameFilterText = '';
  brandNameFilterText = '';
  colorNameFilterText = '';
  brands: Brand[];
  colors: Color[];
  //For Filter Bar
  selectedBrandIdText: string = 'Marka Seç';
  selectedColorIdText: string = 'Renk Seç';
  selectedBrandId: number;
  selectedColorId: number;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      } else {
        this.getCars();
      }
    });
    this.getBrandsFromBrandService();
    this.getColorsFromColorService();
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.carDetailDto = response.data;
    });
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.carDetailDto = response.data;
    });
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.carDetailDto = response.data;
    });
  }

  getCarsByBrandIdAndColorId(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandIdAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.carDetailDto = response.data;
      });
  }

  getBrandsFromBrandService() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColorsFromColorService() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  //For Filter Bar
  filterByFilterBar() {
    this.colorIdSetter();
    this.brandIdSetter();
    if (this.selectedBrandId != null && this.selectedColorId == null) {
      this.getCarsByBrandId(this.selectedBrandId);
    } else if (this.selectedBrandId == null && this.selectedColorId != null) {
      this.getCarsByColorId(this.selectedColorId);
    } else if (this.selectedBrandId != null && this.selectedColorId != null) {
      this.getCarsByBrandIdAndColorId(
        this.selectedBrandId,
        this.selectedColorId
      );
    } else this.getCars();
  }

  colorIdSetter() {
    let id = parseInt(this.selectedColorIdText);
    if (this.selectedColorIdText != 'Renk Seç') {
      this.selectedColorId = id;
    } else {
      this.selectedColorId = null;
    }
  }
  
  brandIdSetter() {
    let id = parseInt(this.selectedBrandIdText);
    if (this.selectedBrandIdText != 'Marka Seç') {
      this.selectedBrandId = id;
    } else {
      this.selectedBrandId = null;
    }
  }
}

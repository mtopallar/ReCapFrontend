import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CarDetailsWithImage } from 'src/app/models/carDetailsWithImage';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailWithImageService } from 'src/app/services/car-detail-with-image.service';

@Component({
  selector: 'app-car-detail-with-image',
  templateUrl: './car-detail-with-image.component.html',
  styleUrls: ['./car-detail-with-image.component.css'],
})
export class CarDetailWithImageComponent implements OnInit {
  carDetails: CarDetailsWithImage;
  
  imageUrl:string="https://localhost:44398/CarImages/"

  constructor(private carDetailWithImageService: CarDetailWithImageService, private activatedRoute:ActivatedRoute, private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params=> {
      this.getCarDetails(params["carId"]);
    }))
    
  }
  getCarDetails(carId: number) {
    this.carDetailWithImageService
      .getCarDetails(carId)
      .subscribe((response) => {
        this.carDetails = response.data;                
      });
  }
  getCurrentSlideClass(carImage:CarImage){
    if (carImage == this.carDetails.carImages[0]) {
      return "carousel-item active"
    }
    return "carousel-item"
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailsWithImage } from 'src/app/models/carDetailsWithImage';
import { CarDetailWithImageService } from 'src/app/services/car-detail-with-image.service';

@Component({
  selector: 'app-car-detail-with-image',
  templateUrl: './car-detail-with-image.component.html',
  styleUrls: ['./car-detail-with-image.component.css'],
})
export class CarDetailWithImageComponent implements OnInit {
  carDetails: CarDetailsWithImage;

  constructor(private carDetailWithImageService: CarDetailWithImageService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.getCarDetails(1);
  }
  getCarDetails(carId: number) {
    this.carDetailWithImageService
      .getCarDetails(carId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }
}

import { CarImage } from "./carImage";

export interface CarDetailDto{
    carId:number,
    carName:string,
    brandName:string,
    colorName:string,
    dailyPrice:number,
    description:string,
    imageForCarList:CarImage
}
import { CarImage } from "./carImage";

export interface CarDetailsWithImage{
    carName:string
    brandName:string
    colorName:string
    dailyPrice:number
    modelYear:number
    description:string
    carImages:CarImage[]    
}
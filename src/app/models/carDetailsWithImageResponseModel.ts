import { CarDetailsWithImage } from "./carDetailsWithImage";
import { ResponseModel } from "./responseModel";

export interface CarDetailWithImageResponseModel extends ResponseModel{
    data:CarDetailsWithImage
}
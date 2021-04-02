import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailWithMainImageDto } from '../models/carDetailWithMainImageDto';


@Pipe({
  name: 'carNameFilterPipe'
})
export class CarNameFilterPipePipe implements PipeTransform {

  transform(value: CarDetailWithMainImageDto[], carNameFilterText: string): CarDetailWithMainImageDto[] {
    carNameFilterText= carNameFilterText?carNameFilterText.toLocaleLowerCase():""
    return carNameFilterText?value.filter((n:CarDetailWithMainImageDto)=>n.carName.toLocaleLowerCase().indexOf(carNameFilterText)!==-1):value;
  }

}

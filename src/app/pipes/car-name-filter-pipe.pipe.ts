import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'carNameFilterPipe'
})
export class CarNameFilterPipePipe implements PipeTransform {

  transform(value: CarDetailDto[], carNameFilterText: string): CarDetailDto[] {
    carNameFilterText= carNameFilterText?carNameFilterText.toLocaleLowerCase():""
    return carNameFilterText?value.filter((n:CarDetailDto)=>n.carName.toLocaleLowerCase().indexOf(carNameFilterText)!==-1):value;
  }

}

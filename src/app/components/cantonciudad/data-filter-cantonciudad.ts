import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "dataFilterCantonciudad"
})
export class DataFilterCantonciudad implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.cantonCiudadNombre.indexOf(query) > -1);
    }
    return array;
  }
}

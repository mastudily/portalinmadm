import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "dataFilterTipoinmueble"
})
export class DataFilterTipoinmueble implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.tipoInmuebleNombre.indexOf(query) > -1);
    }
    return array;
  }
}

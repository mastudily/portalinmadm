import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "dataFilterProvestado"
})
export class DataFilterProvestado implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.provEstadoNombre.indexOf(query) > -1);
    }
    return array;
  }
}

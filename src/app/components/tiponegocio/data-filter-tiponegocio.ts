import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "dataFilterTiponegocio"
})
export class DataFilterTiponegocio implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.tipoNegocioNombre.indexOf(query) > -1);
    }
    return array;
  }
}

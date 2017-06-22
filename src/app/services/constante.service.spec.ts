/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConstanteService } from './constante.service';

describe('ConstanteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstanteService]
    });
  });

  it('should ...', inject([ConstanteService], (service: ConstanteService) => {
    expect(service).toBeTruthy();
  }));
});

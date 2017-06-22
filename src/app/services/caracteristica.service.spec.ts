/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CaracteristicaService } from './caracteristica.service';

describe('CaracteristicaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaracteristicaService]
    });
  });

  it('should ...', inject([CaracteristicaService], (service: CaracteristicaService) => {
    expect(service).toBeTruthy();
  }));
});

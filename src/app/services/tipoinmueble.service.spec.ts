/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoinmuebleService } from './tipoinmueble.service';

describe('TipoinmuebleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoinmuebleService]
    });
  });

  it('should ...', inject([TipoinmuebleService], (service: TipoinmuebleService) => {
    expect(service).toBeTruthy();
  }));
});

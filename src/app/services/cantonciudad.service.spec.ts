/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CantonciudadService } from './cantonciudad.service';

describe('CantonciudadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CantonciudadService]
    });
  });

  it('should ...', inject([CantonciudadService], (service: CantonciudadService) => {
    expect(service).toBeTruthy();
  }));
});

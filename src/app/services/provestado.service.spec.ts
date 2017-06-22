/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProvestadoService } from './provestado.service';

describe('ProvestadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvestadoService]
    });
  });

  it('should ...', inject([ProvestadoService], (service: ProvestadoService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaisService } from './pais.service';

describe('PaisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaisService]
    });
  });

  it('should ...', inject([PaisService], (service: PaisService) => {
    expect(service).toBeTruthy();
  }));
});

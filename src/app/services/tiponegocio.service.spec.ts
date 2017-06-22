/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TiponegocioService } from './tiponegocio.service';

describe('TiponegocioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiponegocioService]
    });
  });

  it('should ...', inject([TiponegocioService], (service: TiponegocioService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParroquiazonaService } from './parroquiazona.service';

describe('ParroquiazonaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParroquiazonaService]
    });
  });

  it('should ...', inject([ParroquiazonaService], (service: ParroquiazonaService) => {
    expect(service).toBeTruthy();
  }));
});

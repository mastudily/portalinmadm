/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CantonciudadComponent } from './cantonciudad.component';

describe('CantonciudadComponent', () => {
  let component: CantonciudadComponent;
  let fixture: ComponentFixture<CantonciudadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantonciudadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantonciudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

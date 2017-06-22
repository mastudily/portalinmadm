/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CantonciudadEditComponent } from './cantonciudad-edit.component';

describe('CantonciudadEditComponent', () => {
  let component: CantonciudadEditComponent;
  let fixture: ComponentFixture<CantonciudadEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantonciudadEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantonciudadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

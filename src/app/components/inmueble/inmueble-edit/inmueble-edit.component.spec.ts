/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InmuebleEditComponent } from './inmueble-edit.component';

describe('InmuebleEditComponent', () => {
  let component: InmuebleEditComponent;
  let fixture: ComponentFixture<InmuebleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmuebleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmuebleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

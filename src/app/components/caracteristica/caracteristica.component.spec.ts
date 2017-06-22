/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CaracteristicaComponent } from './caracteristica.component';

describe('CaracteristicaComponent', () => {
  let component: CaracteristicaComponent;
  let fixture: ComponentFixture<CaracteristicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracteristicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracteristicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

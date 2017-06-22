/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GeografiaComponent } from './geografia.component';

describe('GeografiaComponent', () => {
  let component: GeografiaComponent;
  let fixture: ComponentFixture<GeografiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeografiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

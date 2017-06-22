/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ParroquiazonaComponent } from './parroquiazona.component';

describe('ParroquiazonaComponent', () => {
  let component: ParroquiazonaComponent;
  let fixture: ComponentFixture<ParroquiazonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParroquiazonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParroquiazonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

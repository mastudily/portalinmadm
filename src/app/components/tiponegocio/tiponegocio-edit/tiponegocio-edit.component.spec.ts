/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TiponegocioEditComponent } from './tiponegocio-edit.component';

describe('TiponegocioEditComponent', () => {
  let component: TiponegocioEditComponent;
  let fixture: ComponentFixture<TiponegocioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiponegocioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiponegocioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

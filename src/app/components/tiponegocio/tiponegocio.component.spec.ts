/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TiponegocioComponent } from './tiponegocio.component';

describe('TiponegocioComponent', () => {
  let component: TiponegocioComponent;
  let fixture: ComponentFixture<TiponegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiponegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiponegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

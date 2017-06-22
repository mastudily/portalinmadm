import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {Tiponegocio} from "../../../models/tiponegocio";
import {TiponegocioService} from "../../../services/tiponegocio.service";

export interface ConfirmModel {
  title:string;
  tiponegocioidp:string;
}

@Component({
  selector: 'app-tiponegocio-edit',
  templateUrl: './tiponegocio-edit.component.html',
  styleUrls: ['./tiponegocio-edit.component.css']
})
export class TiponegocioEditComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel  {
  title: string;
  tiponegocioidp:string;

  tiponegocioForm: FormGroup;
  tiponegocio : Tiponegocio = new Tiponegocio;
  private tiponegocioId: number;

  constructor(private fb: FormBuilder,
              public dialogService: DialogService,
              private tiponegocioService: TiponegocioService) {
    super(dialogService);
    this.createForm();
  }


  ngOnInit() {
    this.tiponegocioId = Number.parseInt(this.tiponegocioidp);

    this.tiponegocioService.getTiponegocio(this.tiponegocioId).subscribe(
      res => {
        this.tiponegocio = res.json();
        this.createForm();
      },
      error => console.log(error)
    )
    document.getElementById('tipoNegocioNombre').focus();
  }

  onSubmit() {
    this.tiponegocio = this.tiponegocioForm.value;
    if (this.tiponegocioId == 0) {
      this.tiponegocio.tipoNegocioSta = "ACT";
      this.tiponegocioService.addTiponegocio(this.tiponegocio).subscribe(
        data => {
          console.log("ADDED")
          this.result = true;
          this.close();
        },
        error => {
          this.handleSubmitError(error)
        }
      );
    }
    else {
      this.tiponegocioService.updateTiponegocio(this.tiponegocio).subscribe(
        data => {
          console.log("SAVED")
          this.result = true;
          this.close();
        },
        error => {
          this.handleSubmitError(error)
        }
      );
    }

  }

  onCancel() {
    this.result = false;
    this.close();
  }

  createForm() {
    this.tiponegocioForm = this.fb.group({
      'tipoNegocioId': [this.tiponegocio.tipoNegocioId],
      'tipoNegocioNombre': [this.tiponegocio.tipoNegocioNombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]
      ],
      'tipoNegocioSta': [this.tiponegocio.tipoNegocioSta]
    });
    this.tiponegocioForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.tiponegocioForm) { return; }
    const form = this.tiponegocioForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  protected handleSubmitError(error: any) {
    if (error.status === 400) {
      const data = error.json();
      const field = data.field;
      const key = data.key;
      const messages = this.validationMessages[field];
      this.formErrors[field] = messages[key];
      document.getElementById(field).focus();
    }
  }

  formErrors = {
    'tipoNegocioNombre': '',
  };

  validationMessages = {
    'tipoNegocioNombre': {
      'required':      'Nombre tipo de negocio es requerido.',
      'minlength':     'Nombre tipo de negocio debe tener al menos 3 caracteres.',
      'maxlength':     'Nombre tipo de negocio no debe tener mas de 30 caracteres.',
      'yaexiste':      'Ya existe un tipo de negocio con este nombre'
    }
  };

}

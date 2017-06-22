import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {Tipoinmueble} from "../../../models/tipoinmueble";
import {TipoinmuebleService} from "../../../services/tipoinmueble.service";

export interface ConfirmModel {
  title:string;
  tipoinmuebleidp:string;
}

@Component({
  selector: 'app-tipoinmueble-edit',
  templateUrl: './tipoinmueble-edit.component.html',
  styleUrls: ['./tipoinmueble-edit.component.css']
})
export class TipoinmuebleEditComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel  {
  title: string;
  tipoinmuebleidp:string;

  tipoinmuebleForm: FormGroup;
  tipoinmueble : Tipoinmueble = new Tipoinmueble;
  private tipoinmuebleId: number;

  constructor(private fb: FormBuilder,
              public dialogService: DialogService,
              private tipoinmuebleService: TipoinmuebleService) {
    super(dialogService);
    this.createForm();
  }


  ngOnInit() {
    this.tipoinmuebleId = Number.parseInt(this.tipoinmuebleidp);

    this.tipoinmuebleService.getTipoinmueble(this.tipoinmuebleId).subscribe(
      res => {
        this.tipoinmueble = res.json();
        this.createForm();
      },
      error => console.log(error)
    )
    document.getElementById('tipoInmuebleNombre').focus();
  }

  onSubmit() {
    this.tipoinmueble = this.tipoinmuebleForm.value;
    if (this.tipoinmuebleId == 0) {
      this.tipoinmueble.tipoInmuebleSta = "ACT";
      this.tipoinmuebleService.addTipoinmueble(this.tipoinmueble).subscribe(
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
      this.tipoinmuebleService.updateTipoinmueble(this.tipoinmueble).subscribe(
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
    this.tipoinmuebleForm = this.fb.group({
      'tipoInmuebleId': [this.tipoinmueble.tipoInmuebleId],
      'tipoInmuebleNombre': [this.tipoinmueble.tipoInmuebleNombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]
      ],
      'tipoInmuebleSta': [this.tipoinmueble.tipoInmuebleSta]
    });
    this.tipoinmuebleForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.tipoinmuebleForm) { return; }
    const form = this.tipoinmuebleForm;
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
    'tipoInmuebleNombre': '',
  };

  validationMessages = {
    'tipoInmuebleNombre': {
      'required':      'Nombre tipo de inmueble es requerido.',
      'minlength':     'Nombre tipo de inmueble debe tener al menos 3 caracteres.',
      'maxlength':     'Nombre tipo de inmueble no debe tener mas de 30 caracteres.',
      'yaexiste':      'Ya existe un tipo de inmueble con este nombre'
    }
  };

}

import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Pais} from "../../../models/pais";
import {PaisService} from "../../../services/pais.service";

export interface ConfirmModel {
  title:string;
  paisidp:string;
}

@Component({
  selector: 'app-pais-edit',
  templateUrl: './pais-edit.component.html',
  styleUrls: ['./pais-edit.component.css']
})
export class PaisEditComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel  {
  title: string;
  paisidp:string;

  paisForm: FormGroup;
  pais : Pais = new Pais;
  private paisId: number;

  constructor(private fb: FormBuilder,
              public dialogService: DialogService,
              private paisService: PaisService) {
    super(dialogService);
    this.createForm();
  }


  ngOnInit() {
    //this.route.params.forEach((params: Params) => {
      this.paisId = Number.parseInt(this.paisidp);
    //});

    this.paisService.getPais(this.paisId).subscribe(
      res => {
        this.pais = res.json();
        this.createForm();
      },
      error => console.log(error)
    )
    document.getElementById('paisNombre').focus();
  }

  onSubmit() {
    this.pais = this.paisForm.value;
    if (this.paisId == 0) {
      this.pais.paisSta = "ACT";
      this.paisService.addPais(this.pais).subscribe(
        data => {
          console.log("ADDED")
          this.result = true;
          this.close();
          //this.router.navigate(['/pais']);
        },
        error => {
          this.handleSubmitError(error)
        }
      );
    }
    else {
      this.paisService.updatePais(this.pais).subscribe(
        data => {
          console.log("SAVED")
          this.result = true;
          this.close();
          //this.router.navigate(['/pais']);
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
    this.paisForm = this.fb.group({
      'paisId': [this.pais.paisId],
      'paisNombre': [this.pais.paisNombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]
      ],
      'paisSta': [this.pais.paisSta]
    });
    this.paisForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.paisForm) { return; }
    const form = this.paisForm;
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
    'paisNombre': '',
  };

  validationMessages = {
    'paisNombre': {
      'required':      'Nombre pais es requerido.',
      'minlength':     'Nombre pais debe tener al menos 3 caracteres.',
      'maxlength':     'Nombre pais no debe tener mas de 30 caracteres.',
      'yaexiste':      'Ya existe una pais con este nombre'
    }
  };

}

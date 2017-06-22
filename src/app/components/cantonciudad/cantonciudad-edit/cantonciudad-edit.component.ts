import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Cantonciudad} from "../../../models/cantonciudad";
import {CantonciudadPK} from "../../../models/cantonciudadPK";
import {ActivatedRoute, Router} from "@angular/router";
import {CantonciudadService} from "../../../services/cantonciudad.service";

export interface ConfirmModel {
  title:string;
  paisidp:string;
  provestadoidp:string;
  cantonciudadidp:string;
  paisNombre:string;
  provEstadoNombre:string;
}

@Component({
  selector: 'app-cantonciudad-edit',
  templateUrl: './cantonciudad-edit.component.html',
  styleUrls: ['./cantonciudad-edit.component.css']
})
export class CantonciudadEditComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel {
  title:string;
  paisidp:string;
  provestadoidp:string;
  cantonciudadidp:string;
  paisNombre:string;
  provEstadoNombre:string;

  cantonciudadForm: FormGroup;
  cantonciudad : Cantonciudad = new Cantonciudad;
  cantonciudadPK : CantonciudadPK = new CantonciudadPK;
  private paisId: number;
  private provestadoId: number;
  private cantonciudadId: number;
  primeravez: boolean = true;

  constructor(private fb: FormBuilder,
              public dialogService: DialogService,
              private route: ActivatedRoute,
              private router:Router,
              private cantonciudadService: CantonciudadService) {
    super(dialogService);
    this.createForm();
    if (this.primeravez) this.primeravez = false;
  }


  ngOnInit() {

    //this.route.params.forEach((params: Params) => {
    this.paisId = Number.parseInt(this.paisidp);
    this.provestadoId = Number.parseInt(this.provestadoidp);
    this.cantonciudadId = Number.parseInt(this.cantonciudadidp);
    //});
    //this.rutaCantonciudad =  "/cantonciudad/"+this.paisId.toString()+"/"+this.paisNombre;
    this.cantonciudadService.getCantonciudad(this.paisId, this.provestadoId, this.cantonciudadId).subscribe(
      res => {
        this.cantonciudad = res.json();
        this.createForm();
      },
      error => console.log(error)
    )
    document.getElementById('cantonCiudadNombre').focus();
  }

  onSubmit() {
    this.cantonciudad = this.cantonciudadForm.value;
    this.cantonciudad.cantonciudadPK = this.cantonciudadPK;
    this.cantonciudad.cantonciudadPK.paisId = this.paisId;
    this.cantonciudad.cantonciudadPK.provEstadoId = this.provestadoId;
    this.cantonciudad.cantonciudadPK.cantonCiudadId = this.cantonciudadId;
    if (this.cantonciudadId == 0) {
      this.cantonciudad.cantonCiudadSta = "ACT";
      this.cantonciudadService.addCantonciudad(this.cantonciudad).subscribe(
        data => {
          console.log("ADDED");
          this.result = true;
          this.close();
          //this.router.navigate(['/cantonciudad',this.paisId, this.paisNombre]);
        },
        error => {
          this.handleSubmitError(error)
        }
      );
    }
    else {
      this.cantonciudadService.updateCantonciudad(this.cantonciudad).subscribe(
        data => {
          console.log("SAVED");
          this.result = true;
          this.close();
          //this.router.navigate(['/cantonciudad',this.paisId, this.paisNombre]);
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
    this.cantonciudadForm = this.fb.group({
      'cantonCiudadId': [this.primeravez || this.cantonciudadId==0 ? 0: this.cantonciudad.cantonciudadPK.cantonCiudadId],
      'cantonCiudadNombre': [this.cantonciudad.cantonCiudadNombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]
      ],
      'cantonCiudadSta': [this.cantonciudad.cantonCiudadSta]
    });
    this.cantonciudadForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.cantonciudadForm) { return; }
    const form = this.cantonciudadForm;
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
    'cantonCiudadNombre': '',
  };

  validationMessages = {
    'cantonCiudadNombre': {
      'required':      'Nombre Canton/Ciudad es requerido.',
      'minlength':     'Nombre Canton/Ciudad debe tener al menos 3 caracteres.',
      'maxlength':     'Nombre Canton/Ciudad no debe tener mas de 30 caracteres.',
      'yaexiste':      'Ya existe un Canton/Ciudad con este nombre'
    }
  };

}

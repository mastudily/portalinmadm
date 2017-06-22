import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Parroquiazona} from "../../../models/parroquiazona";
import {ParroquiazonaPK} from "../../../models/parroquiazonaPK";
import {ParroquiazonaService} from "../../../services/parroquiazona.service";

export interface ConfirmModel {
  title:string;
  paisidp:string;
  provestadoidp:string;
  cantonciudadidp:string;
  parroquiazonaidp:string;
  paisNombre:string;
  provEstadoNombre:string;
  cantonCiudadNombre:string;
}

@Component({
  selector: 'app-parroquiazona-edit',
  templateUrl: './parroquiazona-edit.component.html',
  styleUrls: ['./parroquiazona-edit.component.css']
})
export class ParroquiazonaEditComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel {
  title:string;
  paisidp:string;
  provestadoidp:string;
  cantonciudadidp:string;
  parroquiazonaidp:string;
  paisNombre:string;
  provEstadoNombre:string;
  cantonCiudadNombre:string;

  parroquiazonaForm: FormGroup;
  parroquiazona : Parroquiazona = new Parroquiazona;
  parroquiazonaPK : ParroquiazonaPK = new ParroquiazonaPK;
  private paisId: number;
  private provestadoId: number;
  private cantonciudadId: number;
  private parroquiazonaId: number;
  primeravez: boolean = true;

  constructor(private fb: FormBuilder,
              public dialogService: DialogService,
              private parroquiazonaService: ParroquiazonaService) {
    super(dialogService);
    this.createForm();
    if (this.primeravez) this.primeravez = false;
  }


  ngOnInit() {

    //this.route.params.forEach((params: Params) => {
    this.paisId = Number.parseInt(this.paisidp);
    this.provestadoId = Number.parseInt(this.provestadoidp);
    this.cantonciudadId = Number.parseInt(this.cantonciudadidp);
    this.parroquiazonaId = Number.parseInt(this.parroquiazonaidp);
    //});
    //this.rutaParroquiazona =  "/cantonciudad/"+this.paisId.toString()+"/"+this.paisNombre;
    this.parroquiazonaService.getParroquiazona(this.paisId, this.provestadoId, this.cantonciudadId, this.parroquiazonaId).subscribe(
      res => {
        this.parroquiazona = res.json();
        this.createForm();
      },
      error => console.log(error)
    )
    document.getElementById('parroquiaZonaNombre').focus();
  }

  onSubmit() {
    this.parroquiazona = this.parroquiazonaForm.value;
    this.parroquiazona.parroquiazonaPK = this.parroquiazonaPK;
    this.parroquiazona.parroquiazonaPK.paisId = this.paisId;
    this.parroquiazona.parroquiazonaPK.provEstadoId = this.provestadoId;
    this.parroquiazona.parroquiazonaPK.cantonCiudadId = this.cantonciudadId;
    this.parroquiazona.parroquiazonaPK.parroquiaZonaId = this.parroquiazonaId;
    if (this.parroquiazonaId == 0) {
      this.parroquiazona.parroquiaZonaCodPos = "070";
      this.parroquiazona.parroquiaZonaSta = "ACT";
      this.parroquiazonaService.addParroquiazona(this.parroquiazona).subscribe(
        data => {
          console.log("ADDED");
          this.result = true;
          this.close();
          //this.router.navigate(['/parroquiazona',this.paisId, this.paisNombre]);
        },
        error => {
          this.handleSubmitError(error)
        }
      );
    }
    else {
      this.parroquiazonaService.updateParroquiazona(this.parroquiazona).subscribe(
        data => {
          console.log("SAVED");
          this.result = true;
          this.close();
          //this.router.navigate(['/parroquiazona',this.paisId, this.paisNombre]);
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
    this.parroquiazonaForm = this.fb.group({
      'parroquiaZonaId': [this.primeravez || this.parroquiazonaId==0 ? 0: this.parroquiazona.parroquiazonaPK.parroquiaZonaId],
      'parroquiaZonaNombre': [this.parroquiazona.parroquiaZonaNombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]
      ],
      'parroquiaZonaCodPos': [this.parroquiazona.parroquiaZonaCodPos],
      'parroquiaZonaSta': [this.parroquiazona.parroquiaZonaSta]
    });
    this.parroquiazonaForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.parroquiazonaForm) { return; }
    const form = this.parroquiazonaForm;
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
    'parroquiaZonaNombre': '',
  };

  validationMessages = {
    'parroquiaZonaNombre': {
      'required':      'Nombre Parroquia/Zona es requerido.',
      'minlength':     'Nombre Parroquia/Zona debe tener al menos 3 caracteres.',
      'maxlength':     'Nombre Parroquia/Zona no debe tener mas de 30 caracteres.',
      'yaexiste':      'Ya existe una Parroquia/Zona con este nombre'
    }
  };

}

import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Provestado} from "../../../models/provestado";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ProvestadoService} from "../../../services/provestado.service";
import {ProvestadoPK} from "../../../models/provestadoPK";

export interface ConfirmModel {
  title:string;
  paisidp:string;
  provestadoidp:string;
  paisNombre:string;
}

@Component({
  selector: 'app-provestado-edit',
  templateUrl: './provestado-edit.component.html',
  styleUrls: ['./provestado-edit.component.css']
})
export class ProvestadoEditComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel {
  title:string;
  paisidp:string;
  provestadoidp:string;
  paisNombre:string;

  provestadoForm: FormGroup;
  provestado : Provestado = new Provestado;
  provestadoPK : ProvestadoPK = new ProvestadoPK;
  private paisId: number;
  private provestadoId: number;
  public rutaProvestado = "";
  primeravez: boolean = true;

  constructor(private fb: FormBuilder,
              public dialogService: DialogService,
              private route: ActivatedRoute,
              private router:Router,
              private provestadoService: ProvestadoService) {
    super(dialogService);
    this.createForm();
    if (this.primeravez) this.primeravez = false;
  }


  ngOnInit() {

    //this.route.params.forEach((params: Params) => {
      this.paisId = Number.parseInt(this.paisidp);
      this.provestadoId = Number.parseInt(this.provestadoidp);
    //});
    //this.rutaProvestado =  "/provestado/"+this.paisId.toString()+"/"+this.paisNombre;
    this.provestadoService.getProvestado(this.paisId, this.provestadoId).subscribe(
      res => {
        this.provestado = res.json();
        this.createForm();
      },
      error => console.log(error)
    )
    document.getElementById('provEstadoNombre').focus();
  }

  onSubmit() {
    this.provestado = this.provestadoForm.value;
    this.provestado.provestadoPK = this.provestadoPK;
    this.provestado.provestadoPK.paisId = this.paisId;
    this.provestado.provestadoPK.provEstadoId = this.provestadoId;
    if (this.provestadoId == 0) {
      this.provestado.provEstadoSta = "ACT";
      this.provestadoService.addProvestado(this.provestado).subscribe(
        data => {
          console.log("ADDED");
          this.result = true;
          this.close();
          //this.router.navigate(['/provestado',this.paisId, this.paisNombre]);
        },
        error => {
          this.handleSubmitError(error)
        }
      );
    }
    else {
      this.provestadoService.updateProvestado(this.provestado).subscribe(
        data => {
          console.log("SAVED");
          this.result = true;
          this.close();
          //this.router.navigate(['/provestado',this.paisId, this.paisNombre]);
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
    this.provestadoForm = this.fb.group({
      'provEstadoId': [this.primeravez || this.provestadoId==0 ? 0: this.provestado.provestadoPK.provEstadoId],
      'provEstadoNombre': [this.provestado.provEstadoNombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]
      ],
      'provEstadoSta': [this.provestado.provEstadoSta]
    });
    this.provestadoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.provestadoForm) { return; }
    const form = this.provestadoForm;
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
    'provEstadoNombre': '',
  };

  validationMessages = {
    'provEstadoNombre': {
      'required':      'Nombre Provincia/Estado es requerido.',
      'minlength':     'Nombre Provincia/Estado debe tener al menos 3 caracteres.',
      'maxlength':     'Nombre Provincia/Estado no debe tener mas de 30 caracteres.',
      'yaexiste':      'Ya existe una Provincia/Estado con este nombre'
    }
  };

}

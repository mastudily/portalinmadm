import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Caracteristica} from "../../../models/caracteristica";
import {CaracteristicaService} from "../../../services/caracteristica.service";
import {ConstanteService} from "../../../services/constante.service";

@Component({
  selector: 'caracteristica-edit',
  templateUrl: './caracteristica-edit.component.html',
  styleUrls: ['./caracteristica-edit.component.css']
})

export class CaracteristicaEditComponent implements OnInit {
  caracteristicaForm: FormGroup; // <--- heroForm is of type FormGroup
  caracteristica : Caracteristica = new Caracteristica;
  private caracteristicaId: number;
  public tipos;
  public tipovalor;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router:Router,
              private caracteristicaService: CaracteristicaService,
              private constanteService: ConstanteService) { // <--- inject FormBuilder
    this.createForm();
  }


  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.caracteristicaId = Number.parseInt(params['id']);
    });

    this.caracteristicaService.getCaracteristica(this.caracteristicaId).subscribe(
      res => {
        this.caracteristica = res.json();
        this.createForm();
      },
      error => console.log(error)
    )
    this.constanteService.getConstanteCodigo("TipVal") .subscribe(
      res => {
        console.log(res.json());
        this.tipovalor=res.json();
      },
      error => {
        console.log(error);
      }
    );
    document.getElementById('caracteristicaNombre').focus();
  }

  onSubmit() {
    this.caracteristica = this.caracteristicaForm.value;
    if (this.caracteristicaId == 0) {
      this.caracteristica.caracteristicaSta = "ACT";
      this.caracteristicaService.addCaracteristica(this.caracteristica).subscribe(
        data => {
          console.log("ADDED")
          this.router.navigate(['/caracteristica']);
        },
        error => {
          this.handleSubmitError(error)
        }
      );
    }
    else {
      this.caracteristicaService.updateCaracteristica(this.caracteristica).subscribe(
        data => {
          console.log("SAVED")
          this.router.navigate(['/caracteristica']);
        },
        error => {
          this.handleSubmitError(error)
        }
      );
    }

  }

  createForm() {
    this.caracteristicaForm = this.fb.group({
      'caracteristicaId': [this.caracteristica.caracteristicaId],
      'caracteristicaNombre': [this.caracteristica.caracteristicaNombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]
      ],
      'caracteristicaTipoValor': [this.caracteristica.caracteristicaTipoValor],
      'caracteristicaSta': [this.caracteristica.caracteristicaSta]
    });
    this.caracteristicaForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.caracteristicaForm) { return; }
    const form = this.caracteristicaForm;
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
    'caracteristicaNombre': '',
    'caracteristicaTipoValor': ''
  };

  validationMessages = {
    'caracteristicaNombre': {
      'required':      'Nombre caracteristica es requerido.',
      'minlength':     'Nombre caracteristica debe tener al menos 3 caracteres.',
      'maxlength':     'Nombre caracteristica no debe tener mas de 30 caracteres.',
      'yaexiste':      'Ya existe una caracteristica con este nombre'
    },
    'caracteristicaTipoValor': {
      'required':      'Tipo valor caracteristica es requerido.'
    }
  };


}

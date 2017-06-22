import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ReCaptchaComponent } from 'angular2-recaptcha';
import {RecaptchaService} from "../../../services/recaptcha.service";
import {Inmueble} from "../../../models/inmueble";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {InmuebleService} from "../../../services/inmueble.service";
import {TiponegocioService} from "../../../services/tiponegocio.service";
import {TipoinmuebleService} from "../../../services/tipoinmueble.service";
import {ConstanteService} from "../../../services/constante.service";
import {Tipoinmueble} from "../../../models/tipoinmueble";
import {Tiponegocio} from "../../../models/tiponegocio";
import {Parroquiazona} from "../../../models/parroquiazona";
import {ParroquiazonaPK} from "../../../models/parroquiazonaPK";
import {PaisService} from "../../../services/pais.service";
import {ProvestadoService} from "../../../services/provestado.service";
import {CantonciudadService} from "../../../services/cantonciudad.service";
import {ParroquiazonaService} from "../../../services/parroquiazona.service";

@Component({
  selector: 'app-inmueble-edit',
  templateUrl: './inmueble-edit.component.html',
  styleUrls: ['./inmueble-edit.component.css']
})
export class InmuebleEditComponent implements OnInit {
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  inmuebleForm: FormGroup;
  inmueble : Inmueble = new Inmueble;
  private inmuebleId: number;
  public paisinmueble;
  public provestadoinmueble;
  public cantonciudadinmueble;
  public parroquiazonainmueble;
  public tipoinmueble;
  public tiponegocio;
  public zonainmueble;
  private primeravez = true;
  public recaptchavalid: boolean;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router:Router,
              private recaptchaService: RecaptchaService,
              private inmuebleService: InmuebleService,
              private paisService: PaisService,
              private provestadoService: ProvestadoService,
              private cantonciudadService: CantonciudadService,
              private parroquiazonaService: ParroquiazonaService,
              private tipoinmuebleService: TipoinmuebleService,
              private tiponegocioService: TiponegocioService,
              private constanteService: ConstanteService) {
    this.createForm();
    if (this.primeravez = true) this.primeravez = false;
    this.recaptchavalid = false;
  }


  ngOnInit() {
    this.recaptchavalid = false;
    this.route.params.forEach((params: Params) => {
      this.inmuebleId = Number.parseInt(params['id']);
    });
    this.paisService.getPaisList().subscribe(
      res => {
        this.paisinmueble=res.json();
      },
      error => {
        console.log(error);
      }
    );
    this.tipoinmuebleService.getTipoinmuebleList().subscribe(
      res => {
        this.tipoinmueble=res.json();
      },
      error => {
        console.log(error);
      }
    );
    this.tiponegocioService.getTiponegocioList().subscribe(
      res => {
        this.tiponegocio=res.json();
      },
      error => {
        console.log(error);
      }
    );
    this.constanteService.getConstanteCodigo("ZonInm") .subscribe(
      res => {
        console.log(res.json());
        this.zonainmueble=res.json();
      },
      error => {
        console.log(error);
      }
    );
    this.inmuebleService.getInmueble(this.inmuebleId).subscribe(
      res => {
        this.inmueble = res.json();
        this.createForm();
        this.datosRelacionados();
      },
      error => console.log(error)
    );
    document.getElementById('inmuebleDescripcion').focus();
  }

  datosRelacionados() {
    this.provestadoService.getProvestadoList(this.inmueble.paisInmuebleId.toString()).subscribe(
      res => {
        this.provestadoinmueble = res.json();
      },
      error => {
        console.log(error);
      }
    );
    this.cantonciudadService.getCantonciudadList(this.inmueble.paisInmuebleId.toString(), this.inmueble.provEstadoInmuebleId.toString()).subscribe(
      res => {
        this.cantonciudadinmueble = res.json();
      },
      error => {
        console.log(error);
      }
    );
    this.parroquiazonaService.getParroquiazonaList(this.inmueble.paisInmuebleId.toString(), this.inmueble.provEstadoInmuebleId.toString(),this.inmueble.cantonCiudadInmuebleId.toString()).subscribe(
      res => {
        this.parroquiazonainmueble=res.json();
      },
      error => {
        console.log(error);
      }
    );
  }

  provEstado() {
    this.provestadoService.getProvestadoList(this.inmuebleForm.get("paisInmuebleId").value).subscribe(
      res => {
        this.provestadoinmueble = res.json();
        this.inmuebleForm.controls['provEstadoInmuebleId'].setValue(0);
        this.inmuebleForm.controls['cantonCiudadInmuebleId'].setValue(0);
        this.inmuebleForm.controls['parroquiaZonaInmuebleId'].setValue(0);
        this.cantonCiudad();
        this.parroquiaZona();
      },
      error => {
        console.log(error);
      }
    );
  }

  cantonCiudad() {
    this.cantonciudadService.getCantonciudadList(this.inmuebleForm.get("paisInmuebleId").value, this.inmuebleForm.get("provEstadoInmuebleId").value).subscribe(
      res => {
        this.cantonciudadinmueble = res.json();
        this.inmuebleForm.controls['cantonCiudadInmuebleId'].setValue(0);
        this.inmuebleForm.controls['parroquiaZonaInmuebleId'].setValue(0);
        this.parroquiaZona();
      },
      error => {
        console.log(error);
      }
    );
  }

  parroquiaZona() {
    this.parroquiazonaService.getParroquiazonaList(this.inmuebleForm.get("paisInmuebleId").value, this.inmuebleForm.get("provEstadoInmuebleId").value,this.inmuebleForm.get("cantonCiudadInmuebleId").value).subscribe(
      res => {
        this.parroquiazonainmueble=res.json();
        this.inmuebleForm.controls['parroquiaZonaInmuebleId'].setValue(0);
      },
      error => {
        console.log(error);
      }
    );
  }


  onSubmit() {
    this.inmueble = this.inmuebleForm.value;
    if (this.inmuebleId == 0) {
      this.inmueble.inmuebleSta = "ACT";
      this.inmuebleService.addInmueble(this.inmueble).subscribe(
        data => {
          console.log("ADDED")
          this.router.navigate(['/inmueble']);
        },
        error => {
          this.handleSubmitError(error)
        }
      );
    }
    else {
      this.inmuebleService.updateInmueble(this.inmueble).subscribe(
        data => {
          console.log("SAVED")
          this.router.navigate(['/inmueble']);
        },
        error => {
          this.handleSubmitError(error)
        }
      );
    }

  }

  createForm() {
    this.inmuebleForm = this.fb.group({
      'inmuebleId': [this.inmueble.inmuebleId],
      'inmuebleDescripcion': [this.inmueble.inmuebleDescripcion, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]
      ],
      'paisInmuebleId': [this.primeravez ? 0 :this.inmueble.paisInmuebleId],
      'provEstadoInmuebleId': [this.primeravez ? 0 :this.inmueble.provEstadoInmuebleId],
      'cantonCiudadInmuebleId': [this.primeravez ? 0 :this.inmueble.cantonCiudadInmuebleId],
      'parroquiaZonaInmuebleId': [this.primeravez ? 0 :this.inmueble.parroquiaZonaInmuebleId],
      'inmuebleDireccion': [this.inmueble.inmuebleDireccion, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]
      ],
      'tipoInmuebleInmuebleId': [this.primeravez ? 0 :this.inmueble.tipoInmuebleInmuebleId],
      'tipoNegocioInmuebleId': [this.primeravez ? 0 :this.inmueble.tipoNegocioInmuebleId],
      'inmuebleObservaciones': [this.inmueble.inmuebleObservaciones],
      'inmuebleZona': [this.inmueble.inmuebleZona],
      'inmuebleSta': [this.inmueble.inmuebleSta]
    });
    this.inmuebleForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.inmuebleForm) { return; }
    const form = this.inmuebleForm;
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

  handleCorrectCaptcha(event) {
    const token = this.captcha.getResponse();

    this.recaptchaService.validar(token.toString()).subscribe(
      data => {
        console.log("succes");
        this.recaptchavalid = true;
      },
      error => {
        console.log(error);
        this.recaptchavalid = false;
      }
    );
  }

  formErrors = {
    'inmuebleDescripcion': '',
    'inmuebleDireccion': ''
  };

  validationMessages = {
    'inmuebleDescripcion': {
      'required':      'Descripcion del inmueble es requerido.',
      'minlength':     'Descripcion del inmueble debe tener al menos 3 caracteres.',
      'maxlength':     'Descripcion del inmueble no debe tener mas de 30 caracteres.'
    },
    'inmuebleDireccion': {
      'required':      'Direccion del inmueble es requerido.',
      'minlength':     'Direccion del inmueble debe tener al menos 3 caracteres.',
      'maxlength':     'Direccion del inmueble no debe tener mas de 30 caracteres.'
    }
  };


}

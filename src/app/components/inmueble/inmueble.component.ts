import { Component, OnInit, OnDestroy } from '@angular/core';
import {DialogService } from "ng2-bootstrap-modal";
import {InmuebleService} from "../../services/inmueble.service";
import {InmuebleEditComponent} from "./inmueble-edit/inmueble-edit.component";
import {Inmueble} from "../../models/inmueble";
import {ConfirmComponent} from "../../comun/confirm/confirm.component";
import {Router} from "@angular/router";
import {TipoinmuebleService} from "../../services/tipoinmueble.service";
import {TiponegocioService} from "../../services/tiponegocio.service";

@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: ['./inmueble.component.css']
})
export class InmuebleComponent implements OnInit {
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "inmuebleNombre";
  public sortOrder = "asc";
  public insertMode = false;
  public errorRegistro = false;
  public mensajeError=" ";
  public okRegistro = false;
  public mensajeOk=" ";
  public tipoinmueble;
  public tiponegocio;


  constructor(private inmuebleService: InmuebleService,
              private router:Router,
              private dialogService:DialogService,
              private tipoinmuebleService: TipoinmuebleService,
              private tiponegocioService: TiponegocioService) { }

  onCrearInmueble() {
    this.router.navigate(['/inmuebleEdit', 0]);
  }

  onSelect(inmueble:Inmueble) {
    this.router.navigate(['/inmuebleEdit', inmueble.inmuebleId]);
  }


  remove(inmueble:Inmueble) {
    let dlgrem = this.dialogService.addDialog(ConfirmComponent, {title: 'Eliminar Inmueble', message: 'Confirma eliminacion del registro?'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.inmuebleService.remove(inmueble.inmuebleId.toString()).subscribe(
          data => {
            console.log("ELIMINADO");
            this.refreshQuery ();
            this.okRegistro = true;
            this.mensajeOk = "Inmueble eliminado satisfactoriamente...";
          },
          error => {
            console.log(error);
            this.errorRegistro = true;
            this.mensajeError = this.handleSubmitError(error);
          }
        );
        dlgrem.unsubscribe();
      }
    });
  }

  ngOnInit() {
    this.errorRegistro = false;
    this.mensajeError = "";
    this.okRegistro = false;
    this.mensajeOk = "";
    this.filterQuery = localStorage.getItem("queryFilterInmueble");
    if (this.filterQuery=="null") this.filterQuery = "";
    this.refreshQuery();
  }

  refreshQuery() {
    this.inmuebleService.getInmuebleList().subscribe(
      res => {
        console.log(res.json());
        this.data = res.json();
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

  }

  protected handleSubmitError(error: any):string {
    if (error.status === 400) {
      const data = error.json();
      return data.field;
    }
  }

  ngOnDestroy() {
    localStorage.setItem("queryFilterInmueble", this.filterQuery);
  }

}

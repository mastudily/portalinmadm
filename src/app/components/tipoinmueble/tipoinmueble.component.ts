import {Component, OnInit, OnDestroy} from '@angular/core';
import {DialogService } from "ng2-bootstrap-modal";
import {TipoinmuebleService} from "../../services/tipoinmueble.service";
import {TipoinmuebleEditComponent} from "./tipoinmueble-edit/tipoinmueble-edit.component";
import {Tipoinmueble} from "../../models/tipoinmueble";
import {ConfirmComponent} from "../../comun/confirm/confirm.component";

@Component({
  selector: 'app-tipoinmueble',
  templateUrl: './tipoinmueble.component.html',
  styleUrls: ['./tipoinmueble.component.css']
})
export class TipoinmuebleComponent implements OnInit, OnDestroy {

  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "tipoinmuebleNombre";
  public sortOrder = "asc";
  public insertMode = false;
  public errorRegistro = false;
  public mensajeError=" ";
  public okRegistro = false;
  public mensajeOk=" ";

  constructor(private tipoinmuebleService: TipoinmuebleService,
              private dialogService:DialogService) { }

  onCrearTipoinmueble() {
    let dlgnew = this.dialogService.addDialog(TipoinmuebleEditComponent, {title: 'Nuevo Tipo inmueble', tipoinmuebleidp: '0'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery ();
        this.okRegistro = true;
        this.mensajeOk = "Tipo inmueble creado satisfactoriamente...";
        dlgnew.unsubscribe();
        this.insertMode = true;
      }
    });
  }

  onSelect(tipoinmueble:Tipoinmueble) {
    let dlgupd = this.dialogService.addDialog(TipoinmuebleEditComponent, {title: 'Modificar Tipo inmueble', tipoinmuebleidp: tipoinmueble.tipoInmuebleId.toString()}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery ();
        this.okRegistro = true;
        this.mensajeOk = "Tipo inmueble modificado satisfactoriamente...";
        dlgupd.unsubscribe();
        this.insertMode = false;
      }
    });
  }


  remove(tipoinmueble:Tipoinmueble) {
    let dlgrem = this.dialogService.addDialog(ConfirmComponent, {title: 'Eliminar Tipo inmueble', message: 'Confirma eliminacion del registro?'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.tipoinmuebleService.remove(tipoinmueble.tipoInmuebleId.toString()).subscribe(
          data => {
            console.log("ELIMINADO");
            this.refreshQuery ();
            this.okRegistro = true;
            this.mensajeOk = "Tipo inmueble eliminado satisfactoriamente...";
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
    this.filterQuery = localStorage.getItem("queryFilterTipoinmueble");
    if (this.filterQuery=="null") this.filterQuery="";
    this.refreshQuery();
  }

  refreshQuery() {
    this.tipoinmuebleService.getTipoinmuebleList().subscribe(
      res => {
        console.log(res.json());
        this.data = res.json();
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
    localStorage.setItem("queryFilterTipoinmueble", this.filterQuery);
  }


}

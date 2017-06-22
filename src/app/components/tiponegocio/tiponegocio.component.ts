import {Component, OnInit, OnDestroy} from '@angular/core';
import {DialogService } from "ng2-bootstrap-modal";
import {TiponegocioService} from "../../services/tiponegocio.service";
import {TiponegocioEditComponent} from "./tiponegocio-edit/tiponegocio-edit.component";
import {Tiponegocio} from "../../models/tiponegocio";
import {ConfirmComponent} from "../../comun/confirm/confirm.component";

@Component({
  selector: 'app-tiponegocio',
  templateUrl: './tiponegocio.component.html',
  styleUrls: ['./tiponegocio.component.css']
})
export class TiponegocioComponent implements OnInit, OnDestroy {

  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "tiponegocioNombre";
  public sortOrder = "asc";
  public insertMode = false;
  public errorRegistro = false;
  public mensajeError=" ";
  public okRegistro = false;
  public mensajeOk=" ";

  constructor(private tiponegocioService: TiponegocioService,
              private dialogService:DialogService) { }

  onCrearTiponegocio() {
    let dlgnew = this.dialogService.addDialog(TiponegocioEditComponent, {title: 'Nuevo Tipo negocio', tiponegocioidp: '0'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery ();
        this.okRegistro = true;
        this.mensajeOk = "Tipo negocio creado satisfactoriamente...";
        dlgnew.unsubscribe();
        this.insertMode = true;
      }
    });
  }

  onSelect(tiponegocio:Tiponegocio) {
    let dlgupd = this.dialogService.addDialog(TiponegocioEditComponent, {title: 'Modificar Tipo negocio', tiponegocioidp: tiponegocio.tipoNegocioId.toString()}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery ();
        this.okRegistro = true;
        this.mensajeOk = "Tipo negocio modificado satisfactoriamente...";
        dlgupd.unsubscribe();
        this.insertMode = false;
      }
    });
  }


  remove(tiponegocio:Tiponegocio) {
    let dlgrem = this.dialogService.addDialog(ConfirmComponent, {title: 'Eliminar Tipo negocio', message: 'Confirma eliminacion del registro?'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.tiponegocioService.remove(tiponegocio.tipoNegocioId.toString()).subscribe(
          data => {
            console.log("ELIMINADO");
            this.refreshQuery ();
            this.okRegistro = true;
            this.mensajeOk = "Tipo negocio eliminado satisfactoriamente...";
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
    this.filterQuery = localStorage.getItem("queryFilterTiponegocio");
    if (this.filterQuery=="null") this.filterQuery="";
    this.refreshQuery();
  }

  refreshQuery() {
    this.tiponegocioService.getTiponegocioList().subscribe(
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
    localStorage.setItem("queryFilterTiponegocio", this.filterQuery);
  }


}

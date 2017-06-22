import {Component, OnInit, Input} from '@angular/core';
import {DialogService } from "ng2-bootstrap-modal";
import {ParroquiazonaService} from "../../services/parroquiazona.service";
import {Parroquiazona} from "../../models/parroquiazona";
import {ConfirmComponent} from "../../comun/confirm/confirm.component";
import {ParroquiazonaEditComponent} from "./parroquiazona-edit/parroquiazona-edit.component";

@Component({
  selector: 'app-parroquiazona',
  templateUrl: './parroquiazona.component.html',
  styleUrls: ['./parroquiazona.component.css']
})
export class ParroquiazonaComponent implements OnInit {

  @Input() paisNombre: string;
  @Input() provEstadoNombre: string;
  @Input() cantonCiudadNombre: string;

  private paisid: number;
  private provestadoid: number;
  private cantonciudadid: number;
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "parroquiaZonaNombre";
  public sortOrder = "asc";
  public insertMode = false;
  public errorRegistro = false;
  public mensajeError=" ";
  public okRegistro = false;
  public mensajeOk=" ";

  constructor(private parroquiazonaService: ParroquiazonaService,
              private dialogService:DialogService) { }

  ngOnInit() {
    this.errorRegistro = false;
    this.mensajeError = "";
    this.okRegistro = false;
    this.mensajeOk = "";
    this.filterQuery = localStorage.getItem("queryFilterParroquiazona");
    if (this.filterQuery =="null") this.filterQuery ="";
  }

  onCrearParroquiazona() {
    let dlgnew = this.dialogService.addDialog(ParroquiazonaEditComponent,
      {title: 'Nueva Parroquia/Zona',
        paisidp: this.paisid.toString(),
        provestadoidp: this.provestadoid.toString(),
        cantonciudadidp: this.cantonciudadid.toString(),
        parroquiazonaidp: '0',
        paisNombre: this.paisNombre,
        provEstadoNombre: this.provEstadoNombre,
        cantonCiudadNombre: this.cantonCiudadNombre}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery (this.paisid.toString(), this.provestadoid.toString(), this.cantonciudadid.toString());
        this.okRegistro = true;
        this.mensajeOk = "Parroquia/Zona creada satisfactoriamente...";
        dlgnew.unsubscribe();
        this.insertMode = true;
      }
    });
  }

  onSelect(parroquiazona:Parroquiazona) {
    let dlgupd = this.dialogService.addDialog(ParroquiazonaEditComponent,
      {title: 'Modificar Parroquia/Zona',
        paisidp: this.paisid.toString(),
        provestadoidp: this.provestadoid.toString(),
        cantonciudadidp: this.cantonciudadid.toString(),
        parroquiazonaidp: parroquiazona.parroquiazonaPK.parroquiaZonaId.toString(),
        paisNombre: this.paisNombre,
        provEstadoNombre: this.provEstadoNombre,
        cantonCiudadNombre: this.cantonCiudadNombre}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery (this.paisid.toString(), this.provestadoid.toString(), this.cantonciudadid.toString());
        this.okRegistro = true;
        this.mensajeOk = "Parroquia/Zona modificada satisfactoriamente...";
        dlgupd.unsubscribe();
        this.insertMode = true;
      }
    });
  }

  remove(parroquiazona:Parroquiazona) {
    let dlgrem = this.dialogService.addDialog(ConfirmComponent, {title: 'Eliminar Provincia/estado', message: 'Confirma eliminacion del registro?'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.parroquiazonaService.remove(parroquiazona.parroquiazonaPK.paisId.toString(),parroquiazona.parroquiazonaPK.provEstadoId.toString(), parroquiazona.parroquiazonaPK.cantonCiudadId.toString(),parroquiazona.parroquiazonaPK.parroquiaZonaId.toString()).subscribe(
          data => {
            console.log("ELIMINADO");
            this.refreshQuery (this.paisid.toString(), this.provestadoid.toString(), this.cantonciudadid.toString());
            this.okRegistro = true;
            this.mensajeOk = "Parroquia/Zona eliminada satisfactoriamente...";
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

  refreshQuery(paisid:string, provestadoid:string, cantonciudadid:string) {
    this.paisid = Number.parseInt(paisid);
    this.provestadoid = Number.parseInt(provestadoid);
    this.cantonciudadid = Number.parseInt(cantonciudadid);
    this.parroquiazonaService.getParroquiazonaList(paisid, provestadoid,cantonciudadid).subscribe(
      res => {
        this.data = res.json();
      },
      error => {
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
    localStorage.setItem("queryFilterParroquiazona", this.filterQuery);
  }

}

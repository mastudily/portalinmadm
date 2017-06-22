import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DialogService } from "ng2-bootstrap-modal";
import {Cantonciudad} from "../../models/cantonciudad";
import {ConfirmComponent} from "../../comun/confirm/confirm.component";
import {CantonciudadService} from "../../services/cantonciudad.service";
import {CantonciudadEditComponent} from "./cantonciudad-edit/cantonciudad-edit.component";


@Component({
  selector: 'app-cantonciudad',
  templateUrl: './cantonciudad.component.html',
  styleUrls: ['./cantonciudad.component.css']
})
export class CantonciudadComponent implements OnInit {
  @Input() paisNombre: string;
  @Input() provEstadoNombre: string;
  @Output() onParroquiazona = new EventEmitter<Cantonciudad>();

  private paisid: number;
  private provestadoid: number;
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "cantonCiudadNombre";
  public sortOrder = "asc";
  public insertMode = false;
  public errorRegistro = false;
  public mensajeError=" ";
  public okRegistro = false;
  public mensajeOk=" ";

  constructor(private cantonciudadService: CantonciudadService,
              private dialogService:DialogService) { }

  ngOnInit() {
    this.errorRegistro = false;
    this.mensajeError = "";
    this.okRegistro = false;
    this.mensajeOk = "";
    this.filterQuery = localStorage.getItem("queryFilterCantonciudad");
    if (this.filterQuery =="null") this.filterQuery ="";
  }

  onCrearCantonciudad() {
    let dlgnew = this.dialogService.addDialog(CantonciudadEditComponent,
      {title: 'Nuevo Canton/Ciudad',
        paisidp: this.paisid.toString(),
        provestadoidp: this.provestadoid.toString(),
        cantonciudadidp: '0',
        paisNombre: this.paisNombre,
        provEstadoNombre: this.provEstadoNombre}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery (this.paisid.toString(), this.provestadoid.toString());
        this.okRegistro = true;
        this.mensajeOk = "Canton/Ciudad creado satisfactoriamente...";
        dlgnew.unsubscribe();
        this.insertMode = true;
      }
    });
  }

  onSelect(cantonciudad:Cantonciudad) {
    let dlgupd = this.dialogService.addDialog(CantonciudadEditComponent,
      {title: 'Modificar Canton/Ciudad',
        paisidp: this.paisid.toString(),
        provestadoidp: this.provestadoid.toString(),
        cantonciudadidp: cantonciudad.cantonciudadPK.cantonCiudadId.toString(),
        paisNombre: this.paisNombre,
        provEstadoNombre: this.provEstadoNombre}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery (this.paisid.toString(), this.provestadoid.toString());
        this.okRegistro = true;
        this.mensajeOk = "Canton/Ciudad modificado satisfactoriamente...";
        dlgupd.unsubscribe();
        this.insertMode = true;
      }
    });
  }

  onSelectRel(cantonciudad:Cantonciudad) {
    this.onParroquiazona.emit(cantonciudad);
  }

  remove(cantonciudad:Cantonciudad) {
    let dlgrem = this.dialogService.addDialog(ConfirmComponent, {title: 'Eliminar Provincia/estado', message: 'Confirma eliminacion del registro?'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.cantonciudadService.remove(cantonciudad.cantonciudadPK.paisId.toString(),cantonciudad.cantonciudadPK.provEstadoId.toString(), cantonciudad.cantonciudadPK.cantonCiudadId.toString()).subscribe(
          data => {
            console.log("ELIMINADO");
            this.refreshQuery (this.paisid.toString(), this.provestadoid.toString());
            this.okRegistro = true;
            this.mensajeOk = "Canton/Ciudad eliminado satisfactoriamente...";
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

  refreshQuery(paisid:string, provestadoid:string) {
    this.paisid = Number.parseInt(paisid);
    this.provestadoid = Number.parseInt(provestadoid);
    this.cantonciudadService.getCantonciudadList(paisid, provestadoid).subscribe(
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
    localStorage.setItem("queryFilterCantonciudad", this.filterQuery);
  }

}

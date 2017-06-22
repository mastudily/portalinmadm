import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {DialogService } from "ng2-bootstrap-modal";
import {Provestado} from "../../models/provestado";
import {ProvestadoService} from "../../services/provestado.service";
import {ConfirmComponent} from "../../comun/confirm/confirm.component";
import {ProvestadoEditComponent} from "./provestado-edit/provestado-edit.component";

@Component({
  selector: 'app-provestado',
  templateUrl: './provestado.component.html',
  styleUrls: ['./provestado.component.css']
})
export class ProvestadoComponent implements OnInit {
  @Input() paisNombre: string;
  @Output() onCantonciudad = new EventEmitter<Provestado>();

  private paisid: number;
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "provEstadoNombre";
  public sortOrder = "asc";
  public insertMode = false;
  public errorRegistro = false;
  public mensajeError=" ";
  public okRegistro = false;
  public mensajeOk=" ";

  constructor(private provestadoService: ProvestadoService,
              private dialogService:DialogService) { }

  ngOnInit() {
    //this.route.params.forEach((params: Params) => {
    //  this.paisid = Number.parseInt(params['id']);
    //  this.paisNombre = params['nombre'];
    //});

    this.errorRegistro = false;
    this.mensajeError = "";
    this.okRegistro = false;
    this.mensajeOk = "";
    this.filterQuery = localStorage.getItem("queryFilterProvestado");
    if (this.filterQuery =="null") this.filterQuery ="";
    //this.refreshQuery();
    //console.log("Provestado: ngOnInit");
  }

  onCrearProvestado() {
    let dlgnew = this.dialogService.addDialog(ProvestadoEditComponent, {title: 'Nueva Provincia/Estado', paisidp: this.paisid.toString(), provestadoidp: '0', paisNombre: this.paisNombre}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery (this.paisid.toString());
        this.okRegistro = true;
        this.mensajeOk = "Provincia/Estado creada satisfactoriamente...";
        dlgnew.unsubscribe();
        this.insertMode = true;
      }
    });
    //this.selectedProvestado= new Provestado();
    //this.router.navigate(['/provestadoEdit', this.paisid, 0, this.paisNombre]);
    this.insertMode = true;
  }

  onSelectProvestado(provestado:Provestado) {
    let dlgupd = this.dialogService.addDialog(ProvestadoEditComponent, {title: 'Modificar Provincia/Estado', paisidp: this.paisid.toString(), provestadoidp: provestado.provestadoPK.provEstadoId.toString(), paisNombre: this.paisNombre}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery (this.paisid.toString());
        this.okRegistro = true;
        this.mensajeOk = "Provincia/Estado modificada satisfactoriamente...";
        dlgupd.unsubscribe();
        this.insertMode = false;
      }
    });
    //this.selectedProvestado = provestado;
    //this.router.navigate(['/provestadoEdit', this.paisid, this.selectedProvestado.provestadoPK.provEstadoId, this.paisNombre]);
    //this.insertMode = false;
  }

  onSelectRel(provestado:Provestado) {
    this.onCantonciudad.emit(provestado);
  }

  remove(provestado:Provestado) {
    let dlgrem = this.dialogService.addDialog(ConfirmComponent, {title: 'Eliminar Provincia/estado', message: 'Confirma eliminacion del registro?'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.provestadoService.remove(provestado.provestadoPK.paisId.toString(),provestado.provestadoPK.provEstadoId.toString()).subscribe(
          data => {
            console.log("ELIMINADO");
            this.refreshQuery (this.paisid.toString());
            this.okRegistro = true;
            this.mensajeOk = "Provincia/estado eliminado satisfactoriamente...";
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

  refreshQuery(paisid:string) {
    this.paisid = Number.parseInt(paisid);
    this.provestadoService.getProvestadoList(paisid).subscribe(
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
    localStorage.setItem("queryFilterProvestado", this.filterQuery);
  }

}

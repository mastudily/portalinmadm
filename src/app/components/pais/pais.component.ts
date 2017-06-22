import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {DialogService } from "ng2-bootstrap-modal";
import {ConfirmComponent} from "../../comun/confirm/confirm.component";
import {Pais} from "../../models/pais";
import {PaisService} from "../../services/pais.service";
import {PaisEditComponent} from "./pais-edit/pais-edit.component";

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit, OnDestroy {
  @Output() onProvestado = new EventEmitter<Pais>();

  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "paisNombre";
  public sortOrder = "asc";
  public insertMode = false;
  public errorRegistro = false;
  public mensajeError=" ";
  public okRegistro = false;
  public mensajeOk=" ";

  constructor(private paisService: PaisService,
              private dialogService:DialogService) { }

  onCrearPais() {
      let dlgnew = this.dialogService.addDialog(PaisEditComponent, {title: 'Nuevo Pais', paisidp: '0'}).subscribe((isConfirmed)=>{
        if(isConfirmed) {
          this.refreshQuery ();
          this.okRegistro = true;
          this.mensajeOk = "Pais creado satisfactoriamente...";
          dlgnew.unsubscribe();
          this.insertMode = true;
        }
      });
  }

  onSelect(pais:Pais) {
    let dlgupd = this.dialogService.addDialog(PaisEditComponent, {title: 'Modificar Pais', paisidp: pais.paisId.toString()}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.refreshQuery ();
        this.okRegistro = true;
        this.mensajeOk = "Pais modificado satisfactoriamente...";
        dlgupd.unsubscribe();
        this.insertMode = false;
      }
    });
    //this.selectedPais = pais;
    //this.router.navigate(['/paisEdit', this.selectedPais.paisId]);
    //this.insertMode = false;
  }

  onSelectRel(pais:Pais) {
    this.onProvestado.emit(pais);
    //this.selectedPais = pais;
    //this.router.navigate(['/provestado', this.selectedPais.paisId, this.selectedPais.paisNombre]);
    //this.insertMode = false;
  }

  remove(pais:Pais) {
    let dlgrem = this.dialogService.addDialog(ConfirmComponent, {title: 'Eliminar Pais', message: 'Confirma eliminacion del registro?'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.paisService.remove(pais.paisId.toString()).subscribe(
          data => {
            console.log("ELIMINADO");
            this.refreshQuery ();
            this.okRegistro = true;
            this.mensajeOk = "Pais eliminado satisfactoriamente...";
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
    this.filterQuery = localStorage.getItem("queryFilterPais");
    if (this.filterQuery=="null") this.filterQuery = "";
    this.refreshQuery();
  }

  refreshQuery() {
    this.paisService.getPaisList().subscribe(
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
    localStorage.setItem("queryFilterPais", this.filterQuery);
  }



}

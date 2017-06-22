import { Component, OnInit } from '@angular/core';
import {DialogService } from "ng2-bootstrap-modal";
import {CaracteristicaService} from "../../services/caracteristica.service";
import {Caracteristica} from "../../models/caracteristica";
import {Router} from "@angular/router";
import {ConstanteService} from "../../services/constante.service";
import {ConfirmComponent} from "../../comun/confirm/confirm.component";

@Component({
  selector: 'app-caracteristica',
  templateUrl: './caracteristica.component.html',
  styleUrls: ['./caracteristica.component.css']
})
export class CaracteristicaComponent implements OnInit {
  private selectedCaracteristica : Caracteristica;
  public data;
  public tipos;
  public tipovalor;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "caracteristicaNombre";
  public sortOrder = "asc";
  public insertMode = false;
  public errorRegistro = false;
  public mensajeError=" ";
  public okRegistro = false;
  public mensajeOk=" ";


  constructor(private caracteristicaService: CaracteristicaService,
              private constanteService: ConstanteService,
              private router:Router,
              private dialogService:DialogService) { }

  onCrearCaracteristica() {
    this.selectedCaracteristica= new Caracteristica();
    this.router.navigate(['/caracteristicaEdit', 0]);
    this.insertMode = true;
  }

  onSelect(caracteristica:Caracteristica) {
    this.selectedCaracteristica=caracteristica;
    this.router.navigate(['/caracteristicaEdit', this.selectedCaracteristica.caracteristicaId]);
    this.insertMode = false;
  }

  remove(caracteristica:Caracteristica) {
    let dlgrem = this.dialogService.addDialog(ConfirmComponent, {title: 'Eliminar Caracteristica', message: 'Confirma eliminacion del registro?'}).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.caracteristicaService.remove(caracteristica.caracteristicaId.toString()).subscribe(
          data => {
            console.log("ELIMINADO");
            this.refreshQuery ();
            this.okRegistro = true;
            this.mensajeOk = "Caracteristica eliminada satisfactoriamente...";
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
    this.filterQuery = localStorage.getItem("queryFilterCaracteristica");
    if (this.filterQuery==null) this.filterQuery="";
    this.refreshQuery();
  }

  refreshQuery() {
    this.caracteristicaService.getCaracteristicaList().subscribe(
      res => {
        this.data=res.json();
      },
      error => {
        console.log(error);
      }
    );
    this.constanteService.getConstanteCodigo("TipVal") .subscribe(
      res => {
        console.log(res.json());
        this.tipovalor=res.json();
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
    localStorage.setItem("queryFilterCaracteristica", this.filterQuery);
  }


}



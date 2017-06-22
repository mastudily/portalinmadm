import {Component, OnInit, ViewChild} from '@angular/core';
import {Pais} from "../../models/pais";
import {ProvestadoComponent} from "../provestado/provestado.component";
import {Provestado} from "../../models/provestado";
import {CantonciudadComponent} from "../cantonciudad/cantonciudad.component";
import {Cantonciudad} from "../../models/cantonciudad";
import {ParroquiazonaComponent} from "../parroquiazona/parroquiazona.component";

@Component({
  selector: 'app-geografia',
  templateUrl: './geografia.component.html',
  styleUrls: ['./geografia.component.css']
})
export class GeografiaComponent implements OnInit {
  @ViewChild(ProvestadoComponent) provestadoComponent: ProvestadoComponent;
  @ViewChild(CantonciudadComponent) cantonciudadComponent: CantonciudadComponent;
  @ViewChild(ParroquiazonaComponent) parroquiazonaComponent: ParroquiazonaComponent;

  private paisId: number;
  private provEstadoId: number;
  private cantonCiudadId: number;
  private paisNombre:string;
  private provEstadoNombre:string;
  private cantonCiudadNombre:string;
  private selectedGeoTab: number = 0;
  private tabHabilitado = [true,false,false,false];

  constructor() { }

  ngOnInit() {
  }

  selectedGeoTabChange(val: number) {
    this.selectedGeoTab = val;
    this.deshabilitarTab(val);
  }

  deshabilitarTab(val: number) {
    for (let i = 0 ; i <= val ; i++) {
      this.tabHabilitado[i] = true;
    }
    for (let i = val+1 ; i < 4 ; i++) {
      this.tabHabilitado[i] = false;
    }

  }

  onProvestado(pais:Pais) {
    this.selectedGeoTab = 1;
    this.deshabilitarTab(1);
    this.paisId = pais.paisId;
    this.paisNombre = pais.paisNombre;
    this.provestadoComponent.refreshQuery(this.paisId.toString());
  }

  onCantonciudad(provestado:Provestado) {
    this.selectedGeoTab = 2;
    this.deshabilitarTab(2);
    this.paisId = provestado.provestadoPK.paisId;
    this.provEstadoId = provestado.provestadoPK.provEstadoId;
    this.provEstadoNombre = provestado.provEstadoNombre;
    this.cantonciudadComponent.refreshQuery(this.paisId.toString(), this.provEstadoId.toString());
  }

  onParroquiazona(cantonciudad:Cantonciudad) {
    this.selectedGeoTab = 3;
    this.deshabilitarTab(3);
    this.paisId = cantonciudad.cantonciudadPK.paisId;
    this.provEstadoId = cantonciudad.cantonciudadPK.provEstadoId;
    this.cantonCiudadId = cantonciudad.cantonciudadPK.cantonCiudadId;
    this.cantonCiudadNombre = cantonciudad.cantonCiudadNombre
    this.parroquiazonaComponent.refreshQuery(this.paisId.toString(), this.provEstadoId.toString(), this.cantonCiudadId.toString());
  }

}

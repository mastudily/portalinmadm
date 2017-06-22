import {HomeComponent} from "./home/home.component";
import {CaracteristicaComponent} from "./components/caracteristica/caracteristica.component";
import {CaracteristicaEditComponent} from "./components/caracteristica/caracteristica-edit/caracteristica-edit.component";
import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {PaisComponent} from "./components/pais/pais.component";
import {PaisEditComponent} from "./components/pais/pais-edit/pais-edit.component";
import {ProvestadoComponent} from "./components/provestado/provestado.component";
import {ProvestadoEditComponent} from "./components/provestado/provestado-edit/provestado-edit.component";
import {GeografiaComponent} from "./components/geografia/geografia.component";
import {TipoinmuebleComponent} from "./components/tipoinmueble/tipoinmueble.component";
import {TiponegocioComponent} from "./components/tiponegocio/tiponegocio.component";
import {InmuebleComponent} from "./components/inmueble/inmueble.component";
import {InmuebleEditComponent} from "./components/inmueble/inmueble-edit/inmueble-edit.component";

export const routes = [
  {
    path: '',
    data: [''],
    component: HomeComponent
  },
  {
    path: 'inmueble',
    data: ['Inmuebles'],
    component: InmuebleComponent
  },
  {
    path: 'inmuebleEdit/:id',
    data: [''],
    component: InmuebleEditComponent
  },
  {
    path: 'caracteristica',
    data: ['Caracteristicas'],
    component: CaracteristicaComponent
  },
  {
    path: 'caracteristicaEdit/:id',
    data: [''],
    component: CaracteristicaEditComponent
  },
  {
    path: 'geografia',
    data: ['Geografia'],
    component: GeografiaComponent
  },
  {
    path: 'tipoinmueble',
    data: ['Tipo de inmueble'],
    component: TipoinmuebleComponent
  },
  {
    path: 'tiponegocio',
    data: ['Tipo de negocio'],
    component: TiponegocioComponent
  }
];



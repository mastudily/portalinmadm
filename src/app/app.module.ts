import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { DataTableModule } from "angular2-datatable";
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { routes } from './app.routing';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './comun/top-menu/top-menu.component';
import { MainMenuComponent } from './comun/main-menu/main-menu.component';
import { AppFooterComponent } from './comun/app-footer/app-footer.component';
import { SearchFilterPipe } from './comun/main-menu/search-filter.pipe';

import { HomeComponent } from './home/home.component';
import { CaracteristicaComponent } from './components/caracteristica/caracteristica.component';
import { CaracteristicaEditComponent } from './components/caracteristica/caracteristica-edit/caracteristica-edit.component';
import { PaisComponent } from './components/pais/pais.component';
import { PaisEditComponent } from './components/pais/pais-edit/pais-edit.component';
import { ProvestadoComponent } from './components/provestado/provestado.component';
import { CantonciudadComponent } from './components/cantonciudad/cantonciudad.component';

import { ConfirmComponent } from './comun/confirm/confirm.component';

import {RecaptchaService} from "./services/recaptcha.service";
import {ConstanteService} from "./services/constante.service";
import {CaracteristicaService} from "./services/caracteristica.service";
import {PaisService} from "./services/pais.service";
import {ProvestadoService} from "./services/provestado.service";
import {CantonciudadService} from "./services/cantonciudad.service";
import {ParroquiazonaService} from "./services/parroquiazona.service";
import {TiponegocioService} from "./services/tiponegocio.service";
import {TipoinmuebleService} from "./services/tipoinmueble.service";
import {InmuebleService} from "./services/inmueble.service";

import {DataFilterInmueble} from "./components/inmueble/data-filter-inmueble";
import {DataFilterCaracteristica } from "./components/caracteristica/data-filter-caracteristica";
import {DataFilterPais} from "./components/pais/data-filter-pais";
import {DataFilterProvestado} from "./components/provestado/data-filter-provestado";
import {DataFilterCantonciudad} from "./components/cantonciudad/data-filter-cantonciudad";
import {DataFilterParroquiazona} from "./components/parroquiazona/data-filter-parroquiazona";
import {DataFilterTiponegocio} from "./components/tiponegocio/data-filter-tiponegocio";
import {DataFilterTipoinmueble} from "./components/tipoinmueble/data-filter-tipoinmueble";

import { GeografiaComponent } from './components/geografia/geografia.component';
import { ProvestadoEditComponent } from './components/provestado/provestado-edit/provestado-edit.component';
import { CantonciudadEditComponent } from './components/cantonciudad/cantonciudad-edit/cantonciudad-edit.component';
import { ParroquiazonaComponent } from './components/parroquiazona/parroquiazona.component';
import { ParroquiazonaEditComponent } from './components/parroquiazona/parroquiazona-edit/parroquiazona-edit.component';
import { InmuebleComponent } from './components/inmueble/inmueble.component';
import { InmuebleEditComponent } from './components/inmueble/inmueble-edit/inmueble-edit.component';
import { TiponegocioComponent } from './components/tiponegocio/tiponegocio.component';
import { TipoinmuebleComponent } from './components/tipoinmueble/tipoinmueble.component';
import { TiponegocioEditComponent } from './components/tiponegocio/tiponegocio-edit/tiponegocio-edit.component';
import { TipoinmuebleEditComponent } from './components/tipoinmueble/tipoinmueble-edit/tipoinmueble-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    MainMenuComponent,
    SearchFilterPipe,
    DataFilterInmueble,
    DataFilterCaracteristica,
    DataFilterPais,
    DataFilterProvestado,
    DataFilterCantonciudad,
    DataFilterParroquiazona,
    DataFilterTiponegocio,
    DataFilterTipoinmueble,
    AppFooterComponent,
    HomeComponent,
    CaracteristicaComponent,
    CaracteristicaEditComponent,
    GeografiaComponent,
    PaisComponent,
    PaisEditComponent,
    ConfirmComponent,
    ProvestadoComponent,
    ProvestadoEditComponent,
    CantonciudadComponent,
    CantonciudadEditComponent,
    ParroquiazonaComponent,
    ParroquiazonaEditComponent,
    InmuebleComponent,
    InmuebleEditComponent,
    TiponegocioComponent,
    TipoinmuebleComponent,
    TiponegocioEditComponent,
    TipoinmuebleEditComponent
  ],
  entryComponents: [
    PaisEditComponent,
    ProvestadoEditComponent,
    CantonciudadEditComponent,
    ParroquiazonaEditComponent,
    TiponegocioEditComponent,
    TipoinmuebleEditComponent,
    ConfirmComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    RouterModule.forRoot(routes, {useHash: true}),
    MaterialModule,
    BootstrapModalModule,
    ReCaptchaModule
  ],
  providers: [
    RecaptchaService,
    InmuebleService,
    CaracteristicaService,
    ConstanteService,
    PaisService,
    ProvestadoService,
    CantonciudadService,
    ParroquiazonaService,
    TiponegocioService,
    TipoinmuebleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

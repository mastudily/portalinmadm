import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AppConst} from "../comun/app-const";
import {Cantonciudad} from "../models/cantonciudad";

@Injectable()
export class CantonciudadService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http: Http) {
  }


  getCantonciudadList(id: string, idprovestado: string) {
    let url = this.serverPath + "/cantonciudad/cantonciudadList/" + id+"/"+idprovestado;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers: headers});
  }

  getCantonciudad(id: number, idprovestado:number, idcantonciudad: number) {
    let url = this.serverPath + "/cantonciudad/" + id + "/" + idprovestado+ "/" + idcantonciudad;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  addCantonciudad(cantonciudad: Cantonciudad) {
    let url = this.serverPath + "/cantonciudad/add";

    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(cantonciudad), {headers: headers});

  }

  updateCantonciudad(cantonciudad: Cantonciudad) {
    let url = this.serverPath + "/cantonciudad/update";

    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(cantonciudad), {headers: headers});

  }

  remove(idpais: string, idprovestado: string, idcantonciudad: string) {
    let url = this.serverPath + "/cantonciudad/delete";
    let cantonciudadInfo = {
      "paisid": idpais,
      "cantonciudadid": idcantonciudad,
      "provestadoid": idprovestado
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(cantonciudadInfo), {headers: headers});
  }
}

import { Injectable } from '@angular/core';
import {AppConst} from "../comun/app-const";
import {Http, Headers} from "@angular/http";
import {Parroquiazona} from "../models/parroquiazona";

@Injectable()
export class ParroquiazonaService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http: Http) {
  }


  getParroquiazonaList(id: string, idprovestado: string, idcantonciudad: string) {
    let url = this.serverPath + "/parroquiazona/parroquiazonaList/" + id+"/"+idprovestado+"/"+idcantonciudad;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers: headers});
  }

  getParroquiazona(id: number, idprovestado:number, idcantonciudad: number, idparroquiazona: number) {
    let url = this.serverPath + "/parroquiazona/" + id + "/" + idprovestado+ "/" + idcantonciudad+"/"+idparroquiazona;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  addParroquiazona(parroquiazona: Parroquiazona) {
    let url = this.serverPath + "/parroquiazona/add";

    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(parroquiazona), {headers: headers});

  }

  updateParroquiazona(parroquiazona: Parroquiazona) {
    let url = this.serverPath + "/parroquiazona/update";

    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(parroquiazona), {headers: headers});

  }

  remove(idpais: string, idprovestado: string, idcantonciudad: string, idparroquiazona: string) {
    let url = this.serverPath + "/parroquiazona/delete";
    let parroquiazonaInfo = {
      "paisid": idpais,
      "provestadoid": idprovestado,
      "cantonciudadid": idcantonciudad,
      "parroquiazonaid": idparroquiazona
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(parroquiazonaInfo), {headers: headers});
  }

}

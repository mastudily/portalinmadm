import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Provestado} from "../models/provestado";
import {AppConst} from "../comun/app-const";

@Injectable()
export class ProvestadoService {
  private serverPath: string = AppConst.serverPath;

  constructor(private http:Http) { }


  getProvestadoList(id:string) {
    let url = this.serverPath+"/provestado/provestadoList/"+id;
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers: headers});
  }

  getProvestado(id:number, idprovestado:number) {
    let url = this.serverPath+"/provestado/"+id+"/"+idprovestado;
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  addProvestado(provestado:Provestado) {
    let url = this.serverPath+"/provestado/add";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(provestado), {headers: headers});

  }

  updateProvestado(provestado:Provestado) {
    let url = this.serverPath+"/provestado/update";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(provestado), {headers: headers});

  }

  remove(idpais:string, idprovestado:string) {
    let url = this.serverPath+"/provestado/delete";
    let provestadoInfo = {
      "paisid" : idpais,
      "provestadoid" : idprovestado,
    };

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(provestadoInfo), {headers: headers});
  }

}

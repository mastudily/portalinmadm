import { Injectable } from '@angular/core';
import {AppConst} from "../comun/app-const";
import {Http, Headers} from "@angular/http";
import {Tiponegocio} from "../models/tiponegocio";

@Injectable()
export class TiponegocioService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http:Http) { }

  getTiponegocioList() {
    let url = this.serverPath+"/tiponegocio/tiponegocioList";
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers: headers});
  }

  getTiponegocio(id:number) {
    let url = this.serverPath+"/tiponegocio/"+id;
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  addTiponegocio(tiponegocio:Tiponegocio) {
    let url = this.serverPath+"/tiponegocio/add";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(tiponegocio), {headers: headers});

  }

  updateTiponegocio(tiponegocio:Tiponegocio) {
    let url = this.serverPath+"/tiponegocio/update";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(tiponegocio), {headers: headers});

  }

  remove(id:string) {
    let url = this.serverPath+"/tiponegocio/delete";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: headers});
  }

}

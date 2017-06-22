import { Injectable } from '@angular/core';
import { Headers, Http} from "@angular/http";
import {Caracteristica} from "../models/caracteristica";
import {AppConst} from "../comun/app-const";

@Injectable()
export class CaracteristicaService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http:Http) { }

  getCaracteristicaList() {
    let url = this.serverPath+"/caracteristica/caracteristicaList";
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers: headers});
  }

  getCaracteristica(id:number) {
    let url = this.serverPath+"/caracteristica/"+id;
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  addCaracteristica(caracteristica:Caracteristica) {
    let url = this.serverPath+"/caracteristica/add";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(caracteristica), {headers: headers});

  }

  updateCaracteristica(caracteristica:Caracteristica) {
    let url = this.serverPath+"/caracteristica/update";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(caracteristica), {headers: headers});

  }

  remove(id:string) {
    let url = this.serverPath+"/caracteristica/delete";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: headers});
  }

}

import { Injectable } from '@angular/core';
import {AppConst} from "../comun/app-const";
import {Headers, Http} from "@angular/http";
import {Pais} from "../models/pais";

@Injectable()
export class PaisService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http:Http) { }

  getPaisList() {
    let url = this.serverPath+"/pais/paisList";
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers: headers});
  }

  getPais(id:number) {
    let url = this.serverPath+"/pais/"+id;
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  addPais(pais:Pais) {
    let url = this.serverPath+"/pais/add";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(pais), {headers: headers});

  }

  updatePais(pais:Pais) {
    let url = this.serverPath+"/pais/update";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(pais), {headers: headers});

  }

  remove(id:string) {
    let url = this.serverPath+"/pais/delete";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: headers});
  }

}

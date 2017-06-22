import { Injectable } from '@angular/core';
import {AppConst} from "../comun/app-const";
import {Http, Headers} from "@angular/http";
import {Tipoinmueble} from "../models/tipoinmueble";

@Injectable()
export class TipoinmuebleService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http:Http) { }

  getTipoinmuebleList() {
    let url = this.serverPath+"/tipoinmueble/tipoinmuebleList";
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers: headers});
  }

  getTipoinmueble(id:number) {
    let url = this.serverPath+"/tipoinmueble/"+id;
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  addTipoinmueble(tipoinmueble:Tipoinmueble) {
    let url = this.serverPath+"/tipoinmueble/add";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(tipoinmueble), {headers: headers});

  }

  updateTipoinmueble(tipoinmueble:Tipoinmueble) {
    let url = this.serverPath+"/tipoinmueble/update";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(tipoinmueble), {headers: headers});

  }

  remove(id:string) {
    let url = this.serverPath+"/tipoinmueble/delete";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: headers});
  }

}

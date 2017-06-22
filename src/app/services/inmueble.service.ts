import { Injectable } from '@angular/core';
import {AppConst} from "../comun/app-const";
import {Http, Headers} from "@angular/http";
import {Inmueble} from "../models/inmueble";

@Injectable()
export class InmuebleService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http:Http) { }

  getInmuebleList() {
    let url = this.serverPath+"/inmueble/inmuebleList";
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers: headers});
  }

  getInmueble(id:number) {
    let url = this.serverPath+"/inmueble/"+id;
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  addInmueble(inmueble:Inmueble) {
    let url = this.serverPath+"/inmueble/add";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(inmueble), {headers: headers});

  }

  updateInmueble(inmueble:Inmueble) {
    let url = this.serverPath+"/inmueble/update";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(inmueble), {headers: headers});

  }

  remove(id:string) {
    let url = this.serverPath+"/inmueble/delete";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: headers});
  }

}

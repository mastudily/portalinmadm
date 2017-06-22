import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {AppConst} from "../comun/app-const";

@Injectable()
export class ConstanteService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http:Http) { }

  getConstanteCodigo(id:String) {
    let url = this.serverPath+"/constante/constanteCodigo/"+id;
    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers: headers});
  }

}

import { Injectable } from '@angular/core';
import {AppConst} from "../comun/app-const";
import {Http, Headers} from "@angular/http";

@Injectable()
export class RecaptchaService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http:Http) { }

  validar(response:string) {
    let url = this.serverPath+"/usuario/recaptcha?response="+response;
    let headers = new Headers ({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, {headers: headers});

  }

}

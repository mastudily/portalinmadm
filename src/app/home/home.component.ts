import { Component} from '@angular/core';

let doc = require('html-loader!markdown-loader!./home.md');

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  public name = `Ceibo Real Portal Inmobiliario`;
  public doc:string = doc;

}


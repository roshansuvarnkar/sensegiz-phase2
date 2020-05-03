import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sensegiz';
  login:any=[
    {
      id:1,
      name:'Roshan Suvarnkar'
    }
  ]
}

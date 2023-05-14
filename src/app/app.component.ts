import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gameguesser';

  today:number;

  constructor() {
    this.today=Date.now(); 
  
  
  
  }
 
}

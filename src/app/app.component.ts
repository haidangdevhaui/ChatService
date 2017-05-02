import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css', 
    '../assets/css/bootstrap.min.css',
    '../assets/css/components.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app works!';
}

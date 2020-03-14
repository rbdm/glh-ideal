// This component controls the placement of the sidenav, toolbar and main content
// components. It is immutable and should not handle any logic. 

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IDEal';
}

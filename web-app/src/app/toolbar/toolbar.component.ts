// This component handles any logic and styling related to the toolbar.

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  codeEditorLink: string = "/code"
  visualEditorLink: string = "/visual"

  constructor() { }

  ngOnInit(): void {
  }

}

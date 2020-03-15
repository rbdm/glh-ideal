// ELementRef prompts a security risk: https://angular.io/api/core/ElementRef.

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  editorOptions = {theme: 'vs', language: 'typescript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  constructor() {}

  public ngOnInit() {

  }

}

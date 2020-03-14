// ELementRef prompts a security risk: https://angular.io/api/core/ElementRef.

import { Component, OnInit } from '@angular/core';

import * as ace from 'src/assets/ace-builds'; 

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  constructor() { }

  public ngOnInit() {
    ace.config.set('basePath', 'assets/ace-builds/src')
    

    var editor = ace.edit("editor")
    editor.setTheme("github")

    console.log(editor.getOptions())
  }

}

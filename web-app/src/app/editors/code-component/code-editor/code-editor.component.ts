import { Component, OnInit } from '@angular/core';
import { DataModelService } from 'src/app/service/data/data-model.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  editorOptions = {theme: 'vs', language: 'typescript'};
  editorCode: string = 'function x() {\nconsole.log("Hello world!");\n}';

  dataModel: DataModelService;

  constructor(dataModel: DataModelService) {
    this.dataModel = dataModel
  }

  public ngOnInit() { }
}

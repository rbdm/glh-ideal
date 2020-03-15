import { Component, OnInit } from '@angular/core';
import { DataModelService } from 'src/app/data-model/data-model.service';

@Component({
  selector: 'app-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements OnInit {

  dataModel: DataModelService
  codeModel: string

  constructor(dataModel: DataModelService) {
    this.dataModel = dataModel
  }

  ngOnInit(): void {
  
  }

  updateCodeEvent() {
    this.dataModel.storeTemporarySharedCode(this.codeModel)
  }
}

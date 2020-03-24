import { Component, OnInit } from '@angular/core';
import { GlobalSelectionService } from 'src/app/service/global-selection/global-selection.service';
import { DataModelService } from 'src/app/service/data/data-model.service';

@Component({
  selector: 'app-visual-object-editor',
  templateUrl: './visual-object-editor.component.html',
  styleUrls: ['./visual-object-editor.component.css']
})
export class VisualObjectEditorComponent implements OnInit {
  constructor(
    public globalSelection: GlobalSelectionService,
    public dataModel: DataModelService
  ) { }

  ngOnInit(): void {
  }

  removeAll() {
    for (let node of this.globalSelection.selectedNodes) {
      this.dataModel.removeLegalObject(node)
    }
  }
}

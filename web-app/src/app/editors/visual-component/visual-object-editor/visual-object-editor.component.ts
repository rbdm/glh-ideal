import { Component, OnInit } from '@angular/core';
import { GlobalSelectionService } from 'src/app/service/global-selection/global-selection.service';
import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';

@Component({
  selector: 'app-visual-object-editor',
  templateUrl: './visual-object-editor.component.html',
  styleUrls: ['./visual-object-editor.component.css']
})
export class VisualObjectEditorComponent implements OnInit {
  constructor(
    public globalSelection: GlobalSelectionService,
    public dataModel: DataModelService,
    public legalService: LegalObjectService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    for (let node of this.globalSelection.selectedNodes) {
      node.update()
    }
    this.globalSelection.deselectAllNodes()
  }
}

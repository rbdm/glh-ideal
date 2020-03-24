import { Component, OnInit } from '@angular/core';
import { GlobalSelectionService } from 'src/app/service/global-selection/global-selection.service';
import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectNode, LegalNodeData } from 'src/app/service/legal-object/legal-object';
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

  getNodeForm(node: LegalObjectNode<LegalNodeData>) {
    // TODO.
  }
}

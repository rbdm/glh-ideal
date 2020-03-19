import { Component, OnInit, Input } from '@angular/core';
import { LegalObjectNode } from 'src/app/data-model/legal-object/legal-object';
import { DataModelService } from 'src/app/data-model/data-model.service';

@Component({
  selector: 'app-selected-node',
  templateUrl: './selected-node.component.html',
  styleUrls: ['./selected-node.component.css']
})
export class SelectedNodeComponent implements OnInit {

  @Input() selectedNode: number
  private dataModel: DataModelService
  displayNode: LegalObjectNode

  constructor(dataModel: DataModelService) {
    this.dataModel = dataModel
  }

  ngOnInit(): void {
    this.displayNode = this.dataModel.lookUpNode(this.selectedNode)
  }

}

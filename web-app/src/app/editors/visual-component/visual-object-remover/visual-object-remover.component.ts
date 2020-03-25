import { Component, OnInit } from '@angular/core';
import { GlobalSelectionService } from 'src/app/service/global-selection/global-selection.service';
import { DataModelService } from 'src/app/service/data/data-model.service';

@Component({
  selector: 'app-visual-object-remover',
  templateUrl: './visual-object-remover.component.html',
  styleUrls: ['./visual-object-remover.component.css']
})
export class VisualObjectRemoverComponent implements OnInit {

  constructor(
    public globalSelection: GlobalSelectionService,
    public dataModel: DataModelService
  ) { }

  ngOnInit(): void {
  }

  removeAllNodes() {
    for (let node of this.globalSelection.selectedNodes) {
      this.dataModel.removeLegalObject(node)
    }
  }

  removeAllLinks() {
    for (let link of this.globalSelection.selectedLinks) {
      this.dataModel.removeLegalLink(link)
    }
  }
}

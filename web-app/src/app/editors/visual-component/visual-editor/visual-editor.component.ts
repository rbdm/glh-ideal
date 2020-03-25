import { Component, OnInit } from '@angular/core';
import { GlobalSelectionService } from 'src/app/service/global-selection/global-selection.service';
import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';

@Component({
  selector: 'app-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements OnInit {
  typeAheadOptions: any = {
    minLength: 0,
    singleWords: true,
    scrollable: true,
    optionsInScrollableView: 5,
    hideResultsOnBlur: true
  }

  constructor(
    public globalSelection: GlobalSelectionService,
    public dataModel: DataModelService,
    public legalService: LegalObjectService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    for (let node of this.globalSelection.selectedNodes) node.update()
    for (let link of this.globalSelection.selectedLinks) link.update()
    this.globalSelection.deselectAll()
  }

  removeAll() {
    for (let node of this.globalSelection.selectedNodes) this.dataModel.removeLegalObject(node)
    for (let link of this.globalSelection.selectedLinks) this.dataModel.removeLegalLink(link)
    this.globalSelection.deselectAll()
  }
}

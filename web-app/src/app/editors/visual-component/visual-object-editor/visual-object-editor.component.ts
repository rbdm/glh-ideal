import { Component, OnInit } from '@angular/core';
import { GlobalSelectionService } from 'src/app/service/global-selection/global-selection.service';
import { Subscription } from 'rxjs';
import { GlobalSelectionEvent } from 'src/app/service/global-selection/global-selection-event';
import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectNode, LegalObjectData } from 'src/app/service/legal-object/legal-object';

@Component({
  selector: 'app-visual-object-editor',
  templateUrl: './visual-object-editor.component.html',
  styleUrls: ['./visual-object-editor.component.css']
})
export class VisualObjectEditorComponent implements OnInit {

  private globalSelectionServiceSubscription: Subscription

  constructor(
    public globalSelection: GlobalSelectionService,
    public dataModel: DataModelService
  ) { }

  ngOnInit(): void {
    this.globalSelection
      .globalSelectionUpdateObservable
      .subscribe(this.globalSelectionSubscriptionEvent)
  }

  globalSelectionSubscriptionEvent = (event: GlobalSelectionEvent) => {
    this.ngOnInit()
  }

  addBidirectionalRelationship() {
    const selected = this.globalSelection.selected

    selected.forEach((sourceNode, i) => {
      selected.forEach((destinationNode, j) => {
        if (i != j) {
          var sourceID: number = this.dataModel.lookUpMachineID(sourceNode)
          var destinationID: number = this.dataModel.lookUpMachineID(destinationNode)
          this.dataModel.addLegalLink(sourceID, destinationID, 1)
        }
      })
    })
  }

  addDirectedRelationship() {
    const sourceNode: LegalObjectNode<LegalObjectData> = this.globalSelection.selected[0]
    const sourceID: number = this.dataModel.lookUpMachineID(sourceNode)
    this.globalSelection
      .selected
      .forEach((destinationNode, j) => {
        var destinationID: number = this.dataModel.lookUpMachineID(destinationNode)
        this.dataModel.addLegalLink(sourceID, destinationID, 1)
      })
  }

  displayLinkBuilder(): boolean {
    return this.globalSelection.selected.length > 1
  }
}

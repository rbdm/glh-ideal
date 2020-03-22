import { Component, OnInit } from '@angular/core';
import { GlobalSelectionService } from 'src/app/service/global-selection/global-selection.service';
import { Subscription } from 'rxjs';
import { GlobalSelectionEvent } from 'src/app/service/global-selection/global-selection-event';
import { DataModelService } from 'src/app/service/data/data-model.service';

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

  addDirectedRelationship() {
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

  displayLinkBuilder(): boolean {
    return this.globalSelection.selected.length > 1
  }
}

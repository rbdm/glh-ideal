// This component handles the logic and styling of the side navigation bar.
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataModelService } from 'src/app/service/data/data-model.service';
import { GraphVisualService } from 'src/app/service/graph/graph-visual.service';
import { DataEvent } from 'src/app/service/data/data-event';
import { GraphListenerEvent, GraphListenerEventKind } from 'src/app/service/graph/graph-event';
import { GlobalSelectionService } from 'src/app/service/global-selection/global-selection.service';
import { GlobalSelectionEvent } from 'src/app/service/global-selection/global-selection-event';

@Component({
  selector: 'app-visual-side-nav',
  templateUrl: './visual-side-nav.component.html',
  styleUrls: ['./visual-side-nav.component.css']
})
export class VisualSideNavComponent implements OnInit {
  private dataModelServiceSubscription: Subscription
  private graphVisualServiceSubscription: Subscription
  private globalSelectionServiceSubscription: Subscription

  constructor(
    public dataModel: DataModelService, 
    public graphVisual: GraphVisualService,
    public globallySelected: GlobalSelectionService
  ) { }

  ngOnInit(): void {
    this.dataModelServiceSubscription = this.dataModel
      .dataModeUpdateObservable
      .subscribe(this.dataModelSubscriptionEvent)

    this.graphVisualServiceSubscription = this.graphVisual
      .observable
      .subscribe(this.graphVisualSubscriptionEvent)

    this.globalSelectionServiceSubscription = this.globallySelected
      .globalSelectionUpdateObservable
      .subscribe(this.globalSelectionSubscriptionEvent)
  }

  dataModelSubscriptionEvent = (event: DataEvent) => {
    this.globallySelected.deselectAllNodes()
  }

  graphVisualSubscriptionEvent = (event: GraphListenerEvent) => {
    switch (event.eventKind) {
      case GraphListenerEventKind.OnNodeClick:
          this.globallySelected.toggleNodeByID(event.eventSelector)
          console.log(this.dataModel.lookUpNode(event.eventSelector))
      case GraphListenerEventKind.OnLinkClick:
        const sourceID = event.eventSelector.source
        const destinationID = event.eventSelector.destination
        if (sourceID && destinationID) {
            const legalLink = this.dataModel.lookUpLinkByNodeID(sourceID.id, destinationID.id)
            this.globallySelected.toggleLink(legalLink)
        }
    }
  }

  globalSelectionSubscriptionEvent = (event: GlobalSelectionEvent) => {

  }

  // addDirectedRelationship() {
  //   // for node in selected nodes, push edge onto adjacency matrix
  //   for (var i = 0; i < this.selectedNodeID.length; i++) {
  //     const source = this.selectedNodeID[i]
  //     for (var j = 0; j < (this.selectedNodeID.length) && (i != j); j++) {
  //       const destination = this.selectedNodeID[j]
  //       this.dataModel.adjacencyMatrix.addDirectedEdge(source, destination, 1)
  //     }
  //   }
  //   this.refresh()
  // }

  // handleLinkClickEvent(link: any) {
  //   if (link.source && link.target && link.weight) {
  //     console.log('Link from ', link.source.id, ' to ', link.target.id)
  //   }
  // }
}

// This component handles the logic and styling of the side navigation bar.
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataModelService } from 'src/app/service/data/data-model.service';
import { GraphVisualService } from 'src/app/service/graph/graph-visual.service';
import { DataEvent } from 'src/app/service/data/data-event';
import { GraphListenerEvent } from 'src/app/service/graph/graph-event';

@Component({
  selector: 'app-visual-side-nav',
  templateUrl: './visual-side-nav.component.html',
  styleUrls: ['./visual-side-nav.component.css']
})
export class VisualSideNavComponent implements OnInit {


  private dataModelServiceSubscription: Subscription
  private graphVisualServiceSubscription: Subscription

  selectedNodeID: number[]

  constructor(public dataModel: DataModelService, public graphVisual: GraphVisualService) {
    this.selectedNodeID = []
  }

  ngOnInit(): void {
    this.dataModelServiceSubscription = this.dataModel
      .dataModeUpdateObservable
      .subscribe(this.dataModelSubscriptionEvent)

    this.graphVisualServiceSubscription = this.graphVisual
      .observable
      .subscribe(this.graphVisualSubscriptionEvent)
  }

  dataModelSubscriptionEvent = (event: DataEvent) => {
    this.refresh()
  }

  graphVisualSubscriptionEvent = (event: GraphListenerEvent) => {
    this.refresh()
  }

  refresh() {
    this.selectedNodeID = []
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

  // graphListenerEvent(event: GraphListenerEvent) {
  //   switch (event.eventKind) {
  //     case GraphListenerEventKind.OnNodeClick:
  //       this.handleNodeClickEvent(event.eventSelector)
  //     case GraphListenerEventKind.OnLinkClick:
  //       this.handleLinkClickEvent(event.eventSelector)
  //   }
  // }

  // handleNodeClickEvent(nodeID: number) {
  //   const nodeIndex = this.selectedNodeID.indexOf(nodeID)

  //   if (nodeIndex < 0) { // the element is not in the selectedNodes list.
  //     this.selectedNodeID.push(nodeID)
  //   } else {
  //     this.selectedNodeID.splice(nodeIndex, 1)
  //   }
  // }

  // handleLinkClickEvent(link: any) {
  //   if (link.source && link.target && link.weight) {
  //     console.log('Link from ', link.source.id, ' to ', link.target.id)
  //   }
  // }
}
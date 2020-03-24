import { Component, OnInit } from '@angular/core';

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
  constructor(
    public dataModel: DataModelService, 
    public graphVisual: GraphVisualService,
    public globallySelected: GlobalSelectionService
  ) { }

  ngOnInit(): void {
    this.dataModel
      .dataModeUpdateObservable
      .subscribe(this.dataModelSubscriptionEvent)

    this.graphVisual
      .observable
      .subscribe(this.graphVisualSubscriptionEvent)

    this.globallySelected
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
}

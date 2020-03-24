import { Injectable, Input } from '@angular/core';
import { ForceGraph } from './force/force-graph';
import { Observable } from 'rxjs';
import { GraphListenerEvent } from './graph-event';
import { DataModelService } from '../data/data-model.service';
import { GraphOptions, GraphNode, GraphLink } from './graph-types';
import { GlobalSelectionService } from '../global-selection/global-selection.service';
import { GlobalSelectionEvent, GlobalSelectionEventKind } from '../global-selection/global-selection-event';

@Injectable({
  providedIn: 'root'
})
export class GraphVisualService {

  @Input() graphOptions = new GraphOptions(window.innerHeight * 0.9, window.innerWidth * 0.8)

  graph: ForceGraph

  public observable: Observable<GraphListenerEvent>

  constructor(public dataService: DataModelService, public globalSelection: GlobalSelectionService ) {
    this.graph = new ForceGraph(undefined, this.graphOptions)
    this.observable = this.graph.observable

    this.dataService
      .dataModeUpdateObservable
      .subscribe(( ) => this.refresh())

    this.globalSelection
      .globalSelectionUpdateObservable
      .subscribe((event: GlobalSelectionEvent) => {
        switch (event.eventKind) {
          case GlobalSelectionEventKind.GlobalDeselection:
            this.refresh()
        }
      })
  }

  draw(divElement: HTMLElement) {
    this.graph.data = this.getGraphData()
    this.graph.buildGraphIntoElement(divElement)
  }

  refresh() {
    const newData = this.getGraphData()
    this.graph.updateData(newData)
  }

  private getGraphData() {
    const nodes: GraphNode[] = this.dataService.matrix.getNodes()
    const links: GraphLink[] = this.dataService.matrix.getLinks()
    return {
      nodes: nodes,
      links: links
    }
  }
}

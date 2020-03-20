import { Injectable, Input } from '@angular/core';
import { ForceGraph } from './force/force-graph';
import { Observable } from 'rxjs';
import { GraphListenerEvent } from './graph-event';
import { DataModelService } from '../data/data-model.service';
import { GraphOptions } from './graph-types';

@Injectable({
  providedIn: 'root'
})
export class GraphVisualService {

  @Input() graphOptions = new GraphOptions(1200, 1600)

  graph: ForceGraph

  public observable: Observable<GraphListenerEvent>

  constructor(public dataService: DataModelService) {
    this.graph = new ForceGraph(null, this.graphOptions)
    this.observable = this.graph.observable

    this.dataService
      .dataModeUpdateObservable
      .subscribe(( ) => this.refresh())
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
    const nodes = this.dataService.matrix.getNodes()
    const links = this.dataService.matrix.getLinks()
    return {
      nodes: nodes,
      links: links
    }
  }
}

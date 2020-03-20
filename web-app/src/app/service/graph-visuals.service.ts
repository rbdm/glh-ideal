import { Injectable, ViewChild, ElementRef, Input } from '@angular/core';
import { ForceDirectedGraph, ForceDirectedGraphData, ForceDirectedGraphOptions } from './graphs/force-directed-graph';
import { Observable } from 'rxjs';
import { GraphListenerEvent } from './graphs/graph-listener-event';
import { DataModelService } from './data-model.service';

@Injectable({
  providedIn: 'root'
})
export class GraphVisualsService {

  @Input() graphOptions = new ForceDirectedGraphOptions(1200, 1600)

  graph: ForceDirectedGraph

  public graphUpdateObservable: Observable<GraphListenerEvent>

  constructor(public dataModelService: DataModelService) {
    this.graph = new ForceDirectedGraph(null, this.graphOptions)
    this.graphUpdateObservable = this.graph.graphUpdateObservable

    this.dataModelService
      .dataModeUpdateObservable
      .subscribe(( ) => this.refresh())
  }

  draw(divElement: HTMLElement) {
    this.graph.data = this.getGraphData()
    this.graph.buildGraphIntoElement(divElement)
  }

  refresh() {
    console.log('refreshing')
    const newData = this.getGraphData()
    this.graph.updateData(newData)
  }

  private getGraphData() {
    const nodes = this.dataModelService.adjacencyMatrix.getNodes()
    const links = this.dataModelService.adjacencyMatrix.getLinks()
    return {
      nodes: nodes,
      links: links
    }
  }
}

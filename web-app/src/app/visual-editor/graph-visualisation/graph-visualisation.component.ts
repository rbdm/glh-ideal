import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { ForceDirectedGraph, ForceDirectedGraphData, ForceDirectedGraphOptions } from '../../service/graphs/force-directed-graph';
import { GraphListenerEvent } from '../../service/graphs/graph-listener-event'
import { GraphTypes } from '../../service/graphs/graph-types';


@Component({
  selector: 'app-graph-visualisation',
  templateUrl: './graph-visualisation.component.html',
  styleUrls: ['./graph-visualisation.component.css']
})
export class GraphVisualisationComponent implements AfterViewInit {

  @ViewChild("graph") divView: ElementRef
  @Output() listener: EventEmitter<any> = new EventEmitter()

  @Input() graphType: GraphTypes

  @Input() graphData: ForceDirectedGraphData
  @Input() graphOptions: ForceDirectedGraphOptions

  graph: ForceDirectedGraph

  constructor() { }

  ngAfterViewInit(): void {
    this.drawGraph()
  }

  drawGraph() {
    switch(this.graphType) {
      case GraphTypes.ForceDirectedGraph:
        this.drawForceDirectedGraph()
    }
  }

  drawForceDirectedGraph() {
    this.graph = new ForceDirectedGraph(this.graphData, this.graphOptions)
    const notifyListener = (event: GraphListenerEvent): void => {
      this.listener.emit(event)
    }
    this.graph.setListener(notifyListener)
    this.graph.buildGraphIntoElement(this.divView.nativeElement as HTMLElement)
  }

  updateGraphData(newData: any) {
    this.graphData = newData
    this.graph.updateData(newData)
  }

}

import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { ForceDirectedGraph } from './graphs/force-directed-graph';
import { GraphListenerEvent } from '../graph-listener-event/graph-listener-event'
import { GraphTypes } from './graphs/graph-types';


@Component({
  selector: 'app-graph-visualisation',
  templateUrl: './graph-visualisation.component.html',
  styleUrls: ['./graph-visualisation.component.css']
})
export class GraphVisualisationComponent implements AfterViewInit {

  @ViewChild("graph") divView: ElementRef
  @Output() listener: EventEmitter<any> = new EventEmitter()

  @Input() graphType: GraphTypes

  @Input() graphData: any
  @Input() graphOptions: any

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
    this.graph.setListener(this.notifyListener)
    this.graph.buildGraphIntoElement(this.divView.nativeElement as HTMLElement)
  }

  updateGraphData(newData: any) {
    console.log('Updating graph visualisation component.')
    this.graphData = newData
    this.graph.updateData(newData)
  }

  notifyListener = (event: GraphListenerEvent): void => {
    console.log('Graph visualiser notifying listeners: ' + event)
    this.listener.emit(event)
  }
}

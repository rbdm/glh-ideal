import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ForceDirectedGraphData, ForceDirectedGraphOptions, ForceDirectedGraph } from './graphs/force-directed-graph';
import { GraphObserver, GraphListenerEvent } from '../graph-listener-event/graph-listener-event'


@Component({
  selector: 'app-graph-visualisation',
  templateUrl: './graph-visualisation.component.html',
  styleUrls: ['./graph-visualisation.component.css']
})
export class GraphVisualisationComponent implements AfterViewInit {

  @ViewChild("graph") divView: ElementRef
  @Output() listener: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngAfterViewInit(): void { }

  drawGraph() {
    var data = new ForceDirectedGraphData(TEST_DATA.nodes, TEST_DATA.links)
    var options = new ForceDirectedGraphOptions(1000, 1000)
    var graph = new ForceDirectedGraph(data, options)
    graph.setListener(this.notifyListener)
    graph.buildGraphIntoElement(this.divView)
  }

  notifyListener = (event: GraphListenerEvent): void => {
    console.log('Graph visualiser notifying listeners: ' + event)
    this.listener.emit(event)
  }
}


const TEST_DATA = {
  nodes: [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ],
  links: [
    { source: 0, target:  4, weight: 1},
    { source: 4, target:  2, weight: 5}
  ]
}

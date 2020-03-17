import * as d3 from 'd3';

import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ForceDirectedGraphData, ForceDirectedGraphOptions, ForceDirectedGraph } from './graphs/force-directed-graph';

@Component({
  selector: 'app-graph-visualisation',
  templateUrl: './graph-visualisation.component.html',
  styleUrls: ['./graph-visualisation.component.css']
})
export class GraphVisualisationComponent implements AfterViewInit {

  @ViewChild("graph") divView: ElementRef

  constructor() {

  }

  ngAfterViewInit(): void { }

  drawGraph() {
    var data = new ForceDirectedGraphData(TEST_DATA.nodes, TEST_DATA.links)
    var options = new ForceDirectedGraphOptions(1000, 1000)
    var graph = new ForceDirectedGraph(data, options)
    graph.buildGraphIntoElement(this.divView)
  }
}


const TEST_DATA = {
  nodes: [
    { id: "Toussaint", group: 5 },
    { id: "Child1", group: 10 },
    { id: "Child2", group: 10 },
    { id: "Brujon", group: 4 },
    { id: "Mme.Hucheloup", group:  8}
  ],
  links: [
    { source: 0, target:  4, weight: 1},
    { source: 4, target:  2, weight: 5}
  ]
}

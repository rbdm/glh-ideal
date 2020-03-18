import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AdjacencyMatrix } from './adjacency-matrix/adjacency-matrix';
import { ForceDirectedGraphOptions, ForceDirectedGraphData } from './graph-visualisation/graphs/force-directed-graph';
import { GraphTypes } from './graph-visualisation/graphs/graph-types';
import { GraphVisualisationComponent } from './graph-visualisation/graph-visualisation.component';

@Component({
  selector: 'app-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements OnInit {  
  
  adjacencyMatrix: AdjacencyMatrix

  graphType: GraphTypes = GraphTypes.ForceDirectedGraph
  graphOptions = new ForceDirectedGraphOptions(1000, 1000)

  @ViewChild('graphVisualisation') graphVisualisation: GraphVisualisationComponent

  TEST_DATA = {
    nodes: [
      { id: 0, group: 3 },
      { id: 1, group: 3 },
      { id: 2, group: 3 },
      { id: 3, group: 3 },
      { id: 4, group: 3 }
    ],
    links: [
      { source: 0, target:  4, weight: 1},
      { source: 4, target:  2, weight: 5}
    ]
  }
  
  @Output() graphListener: EventEmitter<any> = new EventEmitter()

  constructor() {
    this.adjacencyMatrix = new AdjacencyMatrix()
  }

  ngOnInit(): void {
  
  }

  addDirectedRelationship(source: any, destination: any) {
    console.log('Updating visual editor with relationship: ' + source + ' => ' + destination)
    // this.adjacencyMatrix.addDirectedEdge(source, destination, 3)
    var newTestData = {
      nodes: [
        { id: 0, group: 3 },
        { id: 1, group: 3 },
        { id: 2, group: 3 },
        { id: 3, group: 3 },
        { id: 4, group: 3 },
        { id: 5, group: 3 }
      ],
      links: [
        { source: 0, target: 4, weight: 1},
        { source: 4, target: 2, weight: 2},
        { source: 4, target: 3, weight: 5},
        { source: 5, target: 1, weight: 4}
      ],
    }

    var newData = new ForceDirectedGraphData(newTestData.nodes, newTestData.links)

    this.graphVisualisation.updateGraphData(newData)
  }

  notifyGraphListener(event: any) {
    console.log('Visual editor notifying listeners: ' + event)
    this.graphListener.emit(event)
  }
}

import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AdjacencyMatrix } from './adjacency-matrix/adjacency-matrix';
import { ForceDirectedGraphOptions, ForceDirectedGraphData } from './graph-visualisation/graphs/force-directed-graph';
import { GraphTypes, GraphNode, GraphLink } from './graph-visualisation/graphs/graph-types';
import { GraphVisualisationComponent } from './graph-visualisation/graph-visualisation.component';

@Component({
  selector: 'app-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements OnInit {  
  
  adjacencyMatrix: AdjacencyMatrix = new AdjacencyMatrix()

  graphType: GraphTypes = GraphTypes.ForceDirectedGraph
  graphOptions = new ForceDirectedGraphOptions(1000, 1000)
  graphData: ForceDirectedGraphData

  @ViewChild('graphVisualisation') graphVisualisation: GraphVisualisationComponent
  
  @Output() graphListener: EventEmitter<any> = new EventEmitter()

  constructor() {
    this.graphData = this.parseAdjacencyMatrix()
  }

  ngOnInit(): void {  }

  addDirectedRelationship(source: any, destination: any) {
    this.adjacencyMatrix.addDirectedEdge(source, destination, 1)
    var data = this.parseAdjacencyMatrix()
    this.graphVisualisation.updateGraphData(data)
  }

  parseAdjacencyMatrix() {
    var parsed = this.adjacencyMatrix.intoGraphData()
    return new ForceDirectedGraphData(parsed.nodes, parsed.links)
  }

  notifyGraphListener(event: any) {
    console.log('Visual editor notifying listeners: ' + event)
    this.graphListener.emit(event)
  }
}

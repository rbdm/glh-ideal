import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ForceDirectedGraphOptions, ForceDirectedGraphData } from '../service/graphs/force-directed-graph';
import { GraphTypes } from '../service/graphs/graph-types';
import { GraphVisualisationComponent } from './graph-visualisation/graph-visualisation.component';
import { DataModelService } from '../service/data-model.service';

@Component({
  selector: 'app-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements OnInit {  
  
  dataModel: DataModelService

  graphType: GraphTypes = GraphTypes.ForceDirectedGraph
  graphOptions = new ForceDirectedGraphOptions(1200, 1600)
  graphData: ForceDirectedGraphData

  @ViewChild('graphVisualisation') graphVisualisation: GraphVisualisationComponent
  
  @Output() graphListener: EventEmitter<any> = new EventEmitter()

  constructor(dataModel: DataModelService ) {
    this.dataModel = dataModel
    this.graphData = this.parseAdjacencyMatrix()
  }

  ngOnInit(): void {  }

  refreshGraph() {
    var data = this.parseAdjacencyMatrix()
    this.graphVisualisation.updateGraphData(data)
  }

  parseAdjacencyMatrix() {
    var parsed = this.dataModel.adjacencyMatrix.intoNodesAndLinks()
    return new ForceDirectedGraphData(parsed.nodes, parsed.links)
  }

  addDirectedRelationship(source: any, destination: any) {
    this.dataModel
      .adjacencyMatrix
      .addDirectedEdge(source, destination, 100)
    this.refreshGraph()
  }

  addDisconnectedNode() {
    this.dataModel
      .adjacencyMatrix
      .addDisconnectedVertex()
    this.refreshGraph()
  }

  notifyGraphListener(event: any) {
    this.graphListener.emit(event)
  }
}

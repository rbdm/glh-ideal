// This component handles the logic and styling of the side navigation bar.
import { Component, OnInit, ViewChild } from '@angular/core';
import { VisualEditorComponent } from '../visual-editor/visual-editor.component';
import { GraphListenerEvent, GraphListenerEventKind } from '../data-model/graphs/graph-listener-event';
import { DataModelService } from '../data-model/data-model.service';

@Component({
  selector: 'app-visual-side-nav',
  templateUrl: './visual-side-nav.component.html',
  styleUrls: ['./visual-side-nav.component.css']
})
export class VisualSideNavComponent implements OnInit {

  @ViewChild('editor') visualEditor: VisualEditorComponent

  dataModel: DataModelService

  selectedNode: any

  constructor(dataModel: DataModelService) {
    this.dataModel = dataModel
  }

  ngOnInit(): void { }

  addDirectedRelationship(source: any, destination: any, weight: any) {
    this.dataModel.adjacencyMatrix.addDirectedEdge(source, destination, weight)
    this.visualEditor.refreshGraph()
  }

  addDisconnectedNode() {
    this.dataModel.adjacencyMatrix.addDisconnectedVertex()
    this.visualEditor.refreshGraph()    
  }

  graphListenerEvent(event: GraphListenerEvent) {
    if (event.eventKind == GraphListenerEventKind.OnNodeClick) {
      this.selectedNode = event.eventSelector
    }
  }
}

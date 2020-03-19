// This component handles the logic and styling of the side navigation bar.
import { Component, OnInit, ViewChild } from '@angular/core';
import { VisualEditorComponent } from '../visual-editor/visual-editor.component';
import { GraphListenerEvent, GraphListenerEventKind } from '../data-model/graphs/graph-listener-event';
import { DataModelService } from '../data-model/data-model.service';
import { GraphNode } from '../data-model/graphs/graph-types';

@Component({
  selector: 'app-visual-side-nav',
  templateUrl: './visual-side-nav.component.html',
  styleUrls: ['./visual-side-nav.component.css']
})
export class VisualSideNavComponent implements OnInit {

  @ViewChild('editor') visualEditor: VisualEditorComponent

  dataModel: DataModelService

  displayNode: any
  selectedNodes: any[] = []

  constructor(dataModel: DataModelService) {
    this.dataModel = dataModel
  }

  ngOnInit(): void { }

  addDirectedRelationship() {
    for (var i = 0; i < this.selectedNodes.length; i++) {
      const source = this.selectedNodes[i]
      for (var j = 0; j < (this.selectedNodes.length) && (i != j); j++) {
        const destination = this.selectedNodes[j]
        this.dataModel.adjacencyMatrix.addDirectedEdge(source, destination, 1)
      }
    }
    this.selectedNodes = []
    this.visualEditor.refreshGraph()
  }

  addDisconnectedNode() {
    this.dataModel.adjacencyMatrix.addDisconnectedVertex()
    this.dataModel.nodeStorage.push()

    this.visualEditor.refreshGraph()    
  }

  graphListenerEvent(event: GraphListenerEvent) {
    switch (event.eventKind) {
      case GraphListenerEventKind.OnNodeClick:
        this.handleNodeClickEvent(event.eventSelector)
    }
  }

  handleNodeClickEvent(nodeID: number) {
    const nodeIndex = this.selectedNodes.indexOf(nodeID)

    if (nodeIndex < 0) { // the element is not in the selectedNodes list.
      this.selectedNodes.push(nodeID)
    } else {
      this.selectedNodes.splice(nodeIndex, 1)
    }

    this.displayNode = this.dataModel.lookUpNode(nodeID)
  }
}

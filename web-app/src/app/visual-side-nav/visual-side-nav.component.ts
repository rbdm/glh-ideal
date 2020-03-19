// This component handles the logic and styling of the side navigation bar.
import { Component, OnInit, ViewChild } from '@angular/core';
import { VisualEditorComponent } from '../visual-editor/visual-editor.component';
import { GraphListenerEvent, GraphListenerEventKind } from '../data-model/graphs/graph-listener-event';
import { DataModelService } from '../data-model/data-model.service';
import { GraphLink } from '../data-model/graphs/graph-types';

@Component({
  selector: 'app-visual-side-nav',
  templateUrl: './visual-side-nav.component.html',
  styleUrls: ['./visual-side-nav.component.css']
})
export class VisualSideNavComponent implements OnInit {

  @ViewChild('editor') visualEditor: VisualEditorComponent

  dataModel: DataModelService

  selectedNodeID: any[] = []

  constructor(dataModel: DataModelService) {
    this.dataModel = dataModel
  }

  ngOnInit(): void { }

  addDirectedRelationship() {
    // for node in selected nodes, push edge onto adjacency matrix
    for (var i = 0; i < this.selectedNodeID.length; i++) {
      const source = this.selectedNodeID[i]
      for (var j = 0; j < (this.selectedNodeID.length) && (i != j); j++) {
        const destination = this.selectedNodeID[j]
        this.dataModel.adjacencyMatrix.addDirectedEdge(source, destination, 1)
      }
    }
    this.selectedNodeID = []
    this.visualEditor.refreshGraph()
  }

  addDisconnectedNode() {
    this.dataModel.adjacencyMatrix.addDisconnectedVertex()
    this.dataModel.nodeStorage.push({
      humanReadableID: "MyDummyID", 
      innerData: null,
      machineID: this.dataModel.nodeStorage.length
    })

    this.visualEditor.refreshGraph()    

    this.selectedNodeID = []
  }

  graphListenerEvent(event: GraphListenerEvent) {
    switch (event.eventKind) {
      case GraphListenerEventKind.OnNodeClick:
        this.handleNodeClickEvent(event.eventSelector)
      case GraphListenerEventKind.OnLinkClick:
        this.handleLinkClickEvent(event.eventSelector)
    }
  }

  handleNodeClickEvent(nodeID: number) {
    const nodeIndex = this.selectedNodeID.indexOf(nodeID)

    if (nodeIndex < 0) { // the element is not in the selectedNodes list.
      this.selectedNodeID.push(nodeID)
    } else {
      this.selectedNodeID.splice(nodeIndex, 1)
    }
  }

  handleLinkClickEvent(link: any) {
    if (link.source && link.target && link.weight) {
      console.log('Link from ', link.source.id, ' to ', link.target.id)
    }
  }
}

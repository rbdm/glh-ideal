// This component handles the logic and styling of the side navigation bar.

import { Component, OnInit, ViewChild } from '@angular/core';
import { VisualEditorComponent } from '../visual-editor/visual-editor.component';
import { GraphListenerEvent, GraphListenerEventKind } from '../data-model/graphs/graph-listener-event';

@Component({
  selector: 'app-visual-side-nav',
  templateUrl: './visual-side-nav.component.html',
  styleUrls: ['./visual-side-nav.component.css']
})
export class VisualSideNavComponent implements OnInit {

  @ViewChild('editor') visualEditor: VisualEditorComponent

  selectedNode: any

  constructor( ) { }

  ngOnInit(): void { }

  addDirectedRelationship(source: any, destination: any) {
    this.visualEditor.addDirectedRelationship(source, destination)
  }

  addDisconnectedNode() {
    this.visualEditor.addDisconnectedNode()
  }

  graphListenerEvent(event: GraphListenerEvent) {
    if (event.eventKind == GraphListenerEventKind.OnNodeClick) {
      this.selectedNode = event
    }
  }
}

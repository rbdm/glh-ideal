// This component handles the logic and styling of the side navigation bar.

import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { VisualEditorComponent } from '../visual-editor/visual-editor.component';

@Component({
  selector: 'app-visual-side-nav',
  templateUrl: './visual-side-nav.component.html',
  styleUrls: ['./visual-side-nav.component.css']
})
export class VisualSideNavComponent implements OnInit {

  @ViewChild('editor') visualEditor: VisualEditorComponent

  selectedNode: any

  constructor() { }

  ngOnInit(): void { }

  addDirectedRelationship(source: any, destination: any) {
    this.visualEditor.addDirectedRelationship(source, destination)
  }

  selectNode(event: any) {
    console.log('Sidenav was notified of a selection: ' + event)
    this.selectedNode = event
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdjacencyMatrix } from './adjacency-matrix/adjacency-matrix';

@Component({
  selector: 'app-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements OnInit {  
  
  graph: AdjacencyMatrix
  @Output() listener: EventEmitter<any> = new EventEmitter()

  constructor() {
    this.graph = new AdjacencyMatrix()
  }

  ngOnInit(): void {
  
  }

  addDirectedRelationship(source: any, destination: any) {
    this.graph.addDirectedEdge(source, destination, 3)
  }

  notifyListener(event: any) {
    console.log('Visual editor notifying listeners: ' + event)
    this.listener.emit(event)
  }
}

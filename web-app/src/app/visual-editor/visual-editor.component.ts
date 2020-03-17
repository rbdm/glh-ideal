import { Component, OnInit } from '@angular/core';
import { AdjacencyMatrix } from './adjacency-matrix/adjacency-matrix';

@Component({
  selector: 'app-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements OnInit {  
  graph: AdjacencyMatrix

  constructor() {
    this.graph = new AdjacencyMatrix()
  }

  ngOnInit(): void {
  
  }

  addDirectedRelationship(source: any, destination: any) {
    this.graph.addDirectedEdge(source, destination, 3)
  }
}

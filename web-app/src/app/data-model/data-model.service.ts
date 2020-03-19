import { Injectable } from '@angular/core';
import { AdjacencyMatrix } from './adjacency-matrix/adjacency-matrix';
import { LegalObjectNode } from './legal-object/legal-object';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  temporarySharedCodeModel: string = ""

  adjacencyMatrix: AdjacencyMatrix = new AdjacencyMatrix()

  nodeStorage: LegalObjectNode[] = []

  storeTemporarySharedCode(code: string) {
    this.temporarySharedCodeModel = code
  }

  getTemporarySharedCode(): string {
    return this.temporarySharedCodeModel;
  }

  lookUpNode(nodeID: number): any {
    return this.nodeStorage[nodeID]
  }
}

import { Injectable } from '@angular/core';
import { AdjacencyMatrix } from './adjacency-matrix/adjacency-matrix';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  temporarySharedCodeModel: string = ""

  adjacencyMatrix: AdjacencyMatrix = new AdjacencyMatrix()

  storeTemporarySharedCode(code: string) {
    this.temporarySharedCodeModel = code

    console.log("Save: \n" + this.temporarySharedCodeModel)
  }

  getTemporarySharedCode(): string {
    return this.temporarySharedCodeModel;
  }
}

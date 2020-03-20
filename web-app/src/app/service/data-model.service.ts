import { Injectable } from '@angular/core';
import { AdjacencyMatrix } from './graphs/adjacency-matrix';
import { LegalObjectNode } from './legal-object/legal-object';
import { DataModelEventKind, DataModelEvent } from './data-model-listener';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  temporarySharedCodeModel: string = ""

  adjacencyMatrix: AdjacencyMatrix = new AdjacencyMatrix()
  nodeStorage: LegalObjectNode[] = []

  globallySelectedNodesID: number[] = []

  private dataModelUpdateSubject: Subject<DataModelEvent> = new Subject()
  public dataModeUpdateObservable: Observable<DataModelEvent> = this.dataModelUpdateSubject.asObservable()

  storeTemporarySharedCode(code: string) {
    this.temporarySharedCodeModel = code
  }

  getTemporarySharedCode(): string {
    return this.temporarySharedCodeModel;
  }

  lookUpNode(nodeID: number): any {
    return this.nodeStorage[nodeID]
  }

  addLegalObject(humanReadableID: string, data: any) {
    const machineID = this.adjacencyMatrix.length
    const object = new LegalObjectNode(humanReadableID, machineID, data)

    this.adjacencyMatrix.addDisconnectedVertex()
    this.nodeStorage.push(object)

    this.notifySubscribers(
      machineID, 
      [DataModelEventKind.AdjacencyMatrixUpdate, DataModelEventKind.NodeStorageUpdate]
    )
  }

  private notifySubscribers(machineID: number, eventKinds: DataModelEventKind[]) {
    for (let kind of eventKinds) {
      const eventNotification = new DataModelEvent(machineID, kind)
      this.dataModelUpdateSubject.next(eventNotification)
    }
  }
}

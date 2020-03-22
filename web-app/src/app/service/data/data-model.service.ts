import { Injectable } from '@angular/core';
import { AdjacencyMatrix } from './matrix/adjacency-matrix';
import { DataEventKind, DataEvent } from './data-event';
import { Subject, Observable } from 'rxjs';
import { LegalObjectNode, LegalObjectData } from '../legal-object/legal-object';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  matrix: AdjacencyMatrix = new AdjacencyMatrix()
  nodeStorage: LegalObjectNode<LegalObjectData>[] = []

  private dataModelUpdateSubject: Subject<DataEvent> = new Subject()
  public dataModeUpdateObservable: Observable<DataEvent> = this.dataModelUpdateSubject.asObservable()

  lookUpNode(nodeID: number): any {
    return this.nodeStorage[nodeID]
  }

  addLegalObject(humanReadableID: string, data: any) {
    const machineID = this.matrix.length
    const object = new LegalObjectNode(data)

    this.matrix.addDisconnectedVertex()
    this.nodeStorage.push(object)

    this.notifySubscribers(
      machineID, 
      [DataEventKind.MatrixUpdate, DataEventKind.NodeUpdate]
    )
  }

  private notifySubscribers(machineID: number, eventKinds: DataEventKind[]) {
    for (let kind of eventKinds) {
      const eventNotification = new DataEvent(machineID, kind)
      this.dataModelUpdateSubject.next(eventNotification)
    }
  }
}

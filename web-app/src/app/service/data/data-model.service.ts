import { Injectable } from '@angular/core';
import { AdjacencyMatrix } from './matrix/adjacency-matrix';
import { DataEventKind, DataEvent } from './data-event';
import { Subject, Observable } from 'rxjs';
import { LegalObjectNode, LegalObjectData } from '../legal-object/legal-object';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {
  private dataModelUpdateSubject: Subject<DataEvent> = new Subject()
  public dataModeUpdateObservable: Observable<DataEvent> = this.dataModelUpdateSubject.asObservable()

  matrix: AdjacencyMatrix = new AdjacencyMatrix()
  nodeStorage: LegalObjectNode<LegalObjectData>[] = []

  lookUpNode(nodeID: number): LegalObjectNode<LegalObjectData> {
    return this.nodeStorage[nodeID]
  }

  lookUpMachineID(node: LegalObjectNode<LegalObjectData>) {
    return this.nodeStorage.indexOf(node)
  }

  addLegalObject(data: LegalObjectNode<LegalObjectData>) {
    this.matrix.addDisconnectedVertex()
    this.nodeStorage.push(data)

    const machineID = this.matrix.length
    this.notifySubscribers(machineID, [DataEventKind.MatrixUpdate, DataEventKind.NodeUpdate])
  }

  addLegalLink(sourceNode: number, destinationNode: number, weight: number) {
    this.matrix.addDirectedEdge(sourceNode, destinationNode, weight)
    this.notifySubscribers(sourceNode, [DataEventKind.MatrixUpdate])
    this.notifySubscribers(destinationNode, [DataEventKind.MatrixUpdate])
  }

  private notifySubscribers(machineID: number, eventKinds: DataEventKind[]) {
    for (let kind of eventKinds) {
      const eventNotification = new DataEvent(machineID, kind)
      this.dataModelUpdateSubject.next(eventNotification)
    }
  }
}

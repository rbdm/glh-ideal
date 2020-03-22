import { Injectable } from '@angular/core';
import { AdjacencyMatrix } from './matrix/adjacency-matrix';
import { DataEventKind, DataEvent } from './data-event';
import { Subject, Observable } from 'rxjs';
import { LegalObjectNode, LegalNodeData, DirectedLegalObjectLink, LegalLinkData } from '../legal-object/legal-object';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {
  private dataModelUpdateSubject: Subject<DataEvent> = new Subject()
  public dataModeUpdateObservable: Observable<DataEvent> = this.dataModelUpdateSubject.asObservable()

  matrix: AdjacencyMatrix = new AdjacencyMatrix()
  nodeStorage: LegalObjectNode<LegalNodeData>[] = []
  directedLinkStorage: DirectedLegalObjectLink<LegalLinkData>[] = []

  lookUpNode(nodeID: number): LegalObjectNode<LegalNodeData> {
    return this.nodeStorage[nodeID]
  }

  lookUpMachineID(node: LegalObjectNode<LegalNodeData>) {
    return this.nodeStorage.indexOf(node)
  }

  addLegalObject(data: LegalObjectNode<LegalNodeData>) {
    this.matrix.addDisconnectedVertex()
    this.nodeStorage.push(data)

    const machineID = this.matrix.length
    this.notifySubscribers(machineID, [DataEventKind.MatrixUpdate, DataEventKind.NodeUpdate])
  }

  addDirectedLegalLink(legalLink: DirectedLegalObjectLink<LegalLinkData>, weight: number) {
    const sourceID: number = this.lookUpMachineID(legalLink.sourceNode)
    const destinationID: number = this.lookUpMachineID(legalLink.destinationNode)
    this.matrix.addDirectedEdge(sourceID, destinationID, weight)
    
    this.directedLinkStorage.push(legalLink)

    this.notifySubscribers(sourceID, [DataEventKind.MatrixUpdate])
    this.notifySubscribers(destinationID, [DataEventKind.MatrixUpdate])
  }

  private notifySubscribers(machineID: number, eventKinds: DataEventKind[]) {
    for (let kind of eventKinds) {
      const eventNotification = new DataEvent(machineID, kind)
      this.dataModelUpdateSubject.next(eventNotification)
    }
  }
}

import { Injectable } from '@angular/core';
import { AdjacencyMatrix } from './matrix/adjacency-matrix';
import { DataEventKind, DataEvent } from './data-event';
import { Subject, Observable } from 'rxjs';
import { LegalObject, LegalData, LegalObjectLink } from '../legal-object/legal-object';


@Injectable({
  providedIn: 'root'
})
export class DataModelService {
  private dataModelUpdateSubject: Subject<DataEvent> = new Subject()
  public dataModeUpdateObservable: Observable<DataEvent> = this.dataModelUpdateSubject.asObservable()

  matrix: AdjacencyMatrix = new AdjacencyMatrix()
  nodeStorage: LegalObject<LegalData>[] = []

  lookUpNode(nodeID: number): LegalObject<LegalData> {
    return this.nodeStorage[nodeID]
  }

  lookUpNodeMachineID(node: LegalObject<LegalData>): number {
    return this.nodeStorage.indexOf(node)
  }

  lookUpNodeByPrettyID(prettyID: string): LegalObject<LegalData> {
    for (let node of this.nodeStorage) {
      if (node.prettyID == prettyID) {
        return node
      }
    }
  }

  lookUpLinkByNodes(source: LegalObject<LegalData>, destination: LegalObject<LegalData>): LegalObjectLink<LegalData> {
    const sourceID: number = this.lookUpNodeMachineID(source)
    const destinationID: number = this.lookUpNodeMachineID(destination)
    return this.lookUpLinkByNodeID(sourceID, destinationID)
  }

  lookUpLinkByNodeID(sourceID: number, destinationID: number): LegalObjectLink<LegalData> {
    return this.matrix.get(sourceID, destinationID)
  }

  addLegalObject(data: LegalObject<LegalData>) {
    this.matrix.addDisconnectedVertex()
    this.nodeStorage.push(data)

    const machineID = this.matrix.length
    this.notifySubscribers(machineID, [DataEventKind.MatrixUpdate, DataEventKind.NodeUpdate])
  }

  addDirectedLegalLink(legalLink: LegalObjectLink<LegalData>) {
    const sourceID: number = this.lookUpNodeMachineID(legalLink.sourceNode)
    const destinationID: number = this.lookUpNodeMachineID(legalLink.destinationNode)
    this.matrix.addDirectedEdge(sourceID, destinationID, legalLink)
    
    this.notifySubscribers(sourceID, [DataEventKind.MatrixUpdate])
    this.notifySubscribers(destinationID, [DataEventKind.MatrixUpdate])
  }

  removeLegalObject(node: number | LegalObject<LegalData>) {
    if (typeof(node) != "number") {
      node = this.lookUpNodeMachineID(node)
    }

    console.log(this.nodeStorage)
    console.log(this.matrix)

    this.matrix.removeVertex(node)
    this.nodeStorage.splice(node, 1)

    console.log(this.nodeStorage)
    console.log(this.matrix)

    this.notifySubscribers(node, [DataEventKind.MatrixUpdate])
  }

  getPrettyID(): string[] {
    return this.nodeStorage.map(value => value.prettyID)
  }

  private notifySubscribers(machineID: number, eventKinds: DataEventKind[]) {
    for (let kind of eventKinds) {
      const eventNotification = new DataEvent(machineID, kind)
      this.dataModelUpdateSubject.next(eventNotification)
    }
  }
}

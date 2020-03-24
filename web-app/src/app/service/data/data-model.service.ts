import { Injectable } from '@angular/core';
import { AdjacencyMatrix } from './matrix/adjacency-matrix';
import { DataEventKind, DataEvent } from './data-event';
import { Subject, Observable } from 'rxjs';
import { LegalObjectNode, LegalNodeData, DirectedLegalObjectLink, LegalLinkData, LegalObjectLink } from '../legal-object/legal-object';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {
  private dataModelUpdateSubject: Subject<DataEvent> = new Subject()
  public dataModeUpdateObservable: Observable<DataEvent> = this.dataModelUpdateSubject.asObservable()

  matrix: AdjacencyMatrix = new AdjacencyMatrix()
  nodeStorage: LegalObjectNode<LegalNodeData>[] = []

  lookUpNode(nodeID: number): LegalObjectNode<LegalNodeData> {
    return this.nodeStorage[nodeID]
  }

  lookUpNodeMachineID(node: LegalObjectNode<LegalNodeData>): number {
    return this.nodeStorage.indexOf(node)
  }

  lookUpNodeByPrettyID(prettyID: string): LegalObjectNode<LegalNodeData> {
    for (let node of this.nodeStorage) {
      if (node.prettyID == prettyID) {
        return node
      }
    }
  }

  lookUpLinkByNodes(source: LegalObjectNode<LegalNodeData>, destination: LegalObjectNode<LegalNodeData>): LegalObjectLink<LegalLinkData> {
    const sourceID: number = this.lookUpNodeMachineID(source)
    const destinationID: number = this.lookUpNodeMachineID(destination)
    return this.lookUpLinkByNodeID(sourceID, destinationID)
  }

  lookUpLinkByNodeID(sourceID: number, destinationID: number): LegalObjectLink<LegalLinkData> {
    return this.matrix.get(sourceID, destinationID)
  }

  addLegalObject(data: LegalObjectNode<LegalNodeData>) {
    this.matrix.addDisconnectedVertex()
    this.nodeStorage.push(data)

    const machineID = this.matrix.length
    this.notifySubscribers(machineID, [DataEventKind.MatrixUpdate, DataEventKind.NodeUpdate])
  }

  addDirectedLegalLink(legalLink: DirectedLegalObjectLink<LegalLinkData>) {
    const sourceID: number = this.lookUpNodeMachineID(legalLink.sourceNode)
    const destinationID: number = this.lookUpNodeMachineID(legalLink.destinationNode)
    this.matrix.addDirectedEdge(sourceID, destinationID, legalLink)
    
    this.notifySubscribers(sourceID, [DataEventKind.MatrixUpdate])
    this.notifySubscribers(destinationID, [DataEventKind.MatrixUpdate])
  }

  removeLegalObject(node: number | LegalObjectNode<LegalNodeData>) {
    if (typeof(node) == "number") {
      this.matrix.removeVertex(node)
      this.notifySubscribers(node, [DataEventKind.MatrixUpdate])
    } else {
      const nodeID: number = this.lookUpNodeMachineID(node)
      this.matrix.removeVertex(nodeID)
      this.notifySubscribers(nodeID, [DataEventKind.MatrixUpdate])
    }
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

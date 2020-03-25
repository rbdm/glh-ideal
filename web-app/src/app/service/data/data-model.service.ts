// This should all be split into two services...

import { Injectable } from '@angular/core';
import { AdjacencyMatrix } from './matrix/adjacency-matrix';
import { DataEventKind, DataEvent } from './data-event';
import { Subject, Observable } from 'rxjs';
import { LegalObject, LegalData, LegalObjectLink, LegalLinkData } from '../legal-object/legal-object';


@Injectable({
  providedIn: 'root'
})
export class DataModelService {
  private dataModelUpdateSubject: Subject<DataEvent> = new Subject()
  public dataModeUpdateObservable: Observable<DataEvent> = this.dataModelUpdateSubject.asObservable()

  matrix: AdjacencyMatrix = new AdjacencyMatrix()
  nodeStorage: LegalObject<LegalData>[] = []

  public get nodePrettyID(): string[] {
    return this.nodeStorage.map(value => value.prettyID)
  }

  lookUpNode(nodeID: number): LegalObject<LegalData> {
    return this.nodeStorage[nodeID]
  }

  lookUpNodeMachineID(node: LegalObject<LegalData>): number {
    return this.nodeStorage.indexOf(node)
  }

  lookUpNodeByPrettyID(prettyID: string): LegalObject<LegalData> | null {
    for (let node of this.nodeStorage) {
      if (node.prettyID == prettyID) {
        return node
      }
    }
    return null;
  }

  lookUpLinkByNodes(source: LegalObject<LegalData>, destination: LegalObject<LegalData>): LegalObjectLink<LegalLinkData> {
    const sourceID: number = this.lookUpNodeMachineID(source)
    const destinationID: number = this.lookUpNodeMachineID(destination)
    return this.lookUpLinkByNodeID(sourceID, destinationID)
  }

  lookUpLinkByNodeID(sourceID: number, destinationID: number): LegalObjectLink<LegalLinkData> {
    return this.matrix.get(sourceID, destinationID)
  }

  addLegalObject(data: LegalObject<LegalData>) {
    this.matrix.addDisconnectedVertex()
    this.nodeStorage.push(data)

    const machineID = this.matrix.length
    this.notifySubscribers(machineID, [DataEventKind.MatrixUpdate, DataEventKind.NodeUpdate])
  }

  addDirectedLegalLink(legalLink: LegalObjectLink<LegalLinkData>) {
    if (!legalLink.sourceNode || !legalLink.destinationNode) {
      throw Error('The link does not have a source or destination node.')
    }

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

    this.matrix.removeVertex(node)
    this.nodeStorage.splice(node, 1)

    this.notifySubscribers(node, [DataEventKind.MatrixUpdate])
  }

  removeLegalLink(link: LegalObjectLink<LegalLinkData>) {
    if (link.sourceNode && link.destinationNode){
      const sourceID: number = this.lookUpNodeMachineID(link.sourceNode)
      const destinationID: number = this.lookUpNodeMachineID(link.destinationNode)
      
      if (sourceID > 0 && destinationID > 0) {
        this.matrix.set(sourceID, destinationID, 0)
      } else {
        throw Error('Could not recover source and destination NodeID for the selected link.')
      }
    } else {
      throw Error('Undefined sourceNode and destinationNode in selected link.')
    }
  }

  private notifySubscribers(machineID: number, eventKinds: DataEventKind[]) {
    for (let kind of eventKinds) {
      const eventNotification = new DataEvent(machineID, kind)
      this.dataModelUpdateSubject.next(eventNotification)
    }
  }
}

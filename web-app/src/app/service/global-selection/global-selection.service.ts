import { Injectable } from '@angular/core';
import { LegalObjectNode, LegalNodeData, LegalObjectLink, LegalLinkData } from '../legal-object/legal-object';
import { DataModelService } from '../data/data-model.service';
import { Subject, Observable } from 'rxjs';
import { GlobalSelectionEvent, GlobalSelectionEventKind } from './global-selection-event';

@Injectable({
  providedIn: 'root'
})
export class GlobalSelectionService {
  private globalSelectionUpdateSubject: Subject<GlobalSelectionEvent> = new Subject()
  public globalSelectionUpdateObservable: Observable<GlobalSelectionEvent> = this.globalSelectionUpdateSubject.asObservable()

  selectedNodes: LegalObjectNode<LegalNodeData>[] = []
  selectedLinks: LegalObjectLink<LegalLinkData>[] = []

  constructor(private dataService: DataModelService) { }

  toggleNodeByID(machineID: number) {
    const selectedNode: LegalObjectNode<LegalNodeData> = this.dataService.lookUpNode(machineID)
    this.toggleNode(selectedNode, machineID)
  }

  toggleNode(node: LegalObjectNode<LegalNodeData>, machineID?:number) {
    var eventNotificationKind: GlobalSelectionEventKind
    if (!machineID) {
      machineID = this.dataService.lookUpNodeMachineID(node)
    }

    const nodeIndex: number = this.selectedNodes.indexOf(node)
    if (nodeIndex < 0) {
      this.addNode(node)
      eventNotificationKind = GlobalSelectionEventKind.NodeSelection
    } else {
      this.removeNode(nodeIndex)
      eventNotificationKind = GlobalSelectionEventKind.NodeDeselection
    }

    this.notifySubscribers(machineID, [eventNotificationKind])
  }

  toggleLink(link: LegalObjectLink<LegalLinkData>) {
    var eventNotificationKind: GlobalSelectionEventKind

    const linkIndex: number = this.selectedLinks.indexOf(link)
    if (linkIndex < 0) {
      this.addLink(link)
      eventNotificationKind = GlobalSelectionEventKind.NodeSelection
    } else {
      this.removeLink(linkIndex)
      eventNotificationKind = GlobalSelectionEventKind.NodeDeselection
    }

    this.notifySubscribers(null, [eventNotificationKind])
  }

  addNode(node: LegalObjectNode<LegalNodeData>) {
    this.selectedNodes.push(node)
  }

  removeNode(index: number) {
    this.selectedNodes.splice(index, 1)
  }

  addLink(link: LegalObjectLink<LegalLinkData>) {
    this.selectedLinks.push(link)
  }

  removeLink(index: number) {
    this.selectedLinks.splice(index, 1)
  }

  deselectAllNodes() {
    this.selectedNodes = []
  }

  getNodePrettyID(): string[] {
    return this.selectedNodes.map(value => value.prettyID)
  }

  private notifySubscribers(machineID: number, eventKinds: GlobalSelectionEventKind[]) {
    for (let kind of eventKinds) {
      const eventNotification = new GlobalSelectionEvent(machineID, kind)
      this.globalSelectionUpdateSubject.next(eventNotification)
    }
  }
}

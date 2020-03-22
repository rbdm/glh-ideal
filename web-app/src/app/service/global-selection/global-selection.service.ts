import { Injectable } from '@angular/core';
import { LegalObjectNode, LegalNodeData } from '../legal-object/legal-object';
import { DataModelService } from '../data/data-model.service';
import { Subject, Observable } from 'rxjs';
import { GlobalSelectionEvent, GlobalSelectionEventKind } from './global-selection-event';

@Injectable({
  providedIn: 'root'
})
export class GlobalSelectionService {
  private globalSelectionUpdateSubject: Subject<GlobalSelectionEvent> = new Subject()
  public globalSelectionUpdateObservable: Observable<GlobalSelectionEvent> = this.globalSelectionUpdateSubject.asObservable()

  selected: LegalObjectNode<LegalNodeData>[] = []

  constructor(private dataService: DataModelService) { }

  toggleGloballySelectedByID(machineID: number) {
    const selectedNode: LegalObjectNode<LegalNodeData> = this.dataService.lookUpNode(machineID)
    this.toggleGloballySelectedNode(selectedNode, machineID)
  }

  toggleGloballySelectedNode(node: LegalObjectNode<LegalNodeData>, machineID?:number) {
    var eventNotificationKind: GlobalSelectionEventKind
    if (!machineID) {
      machineID = this.dataService.lookUpMachineID(node)
    }

    const nodeIndex: number = this.selected.indexOf(node)
    if (nodeIndex < 0) {
      this.addGloballySelectedNode(node)
      eventNotificationKind = GlobalSelectionEventKind.NodeSelection
    } else {
      this.removeGloballySelectedNode(nodeIndex)
      eventNotificationKind = GlobalSelectionEventKind.NodeDeselection
    }

    this.notifySubscribers(machineID, [eventNotificationKind])
  }

  addGloballySelectedNode(node: LegalObjectNode<LegalNodeData>) {
    this.selected.push(node)
  }

  removeGloballySelectedNode(index: number) {
    this.selected.splice(index, 1)
  }

  deselectAll() {
    this.selected = []
  }

  getPrettyID(): string[] {
    return this.selected.map(value => value.prettyID)
  }

  private notifySubscribers(machineID: number, eventKinds: GlobalSelectionEventKind[]) {
    for (let kind of eventKinds) {
      const eventNotification = new GlobalSelectionEvent(machineID, kind)
      this.globalSelectionUpdateSubject.next(eventNotification)
    }
  }
}

export class DataEvent {
  nodeID: number

  event: any
  kind: DataEventKind

  constructor(nodeID: number, eventKind: DataEventKind, eventData?: any,) {
    this.nodeID = nodeID
    this.event = eventData
    this.kind = eventKind
  }
}

export enum DataEventKind {
  NodeUpdate,
  MatrixUpdate,
  GlobalUpdate
}
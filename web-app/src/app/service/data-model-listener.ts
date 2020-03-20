export class DataModelEvent {
  nodeID: number

  event: any
  kind: DataModelEventKind

  constructor(nodeID: number, kind: DataModelEventKind, eventData?: any,) {
    this.nodeID = nodeID
    this.event = eventData
    this.kind = kind
  }
}

export enum DataModelEventKind {
  NodeStorageUpdate,
  AdjacencyMatrixUpdate,
  GlobalUpdate
}
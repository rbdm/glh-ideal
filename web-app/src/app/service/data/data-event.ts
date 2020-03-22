export class DataEvent {
  constructor(
    public nodeID: number, 
    public eventKind: DataEventKind, 
    public eventData?: any
  ) {

  }
}

export enum DataEventKind {
  NodeUpdate,
  MatrixUpdate,
  GlobalUpdate
}
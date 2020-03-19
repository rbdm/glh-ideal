export interface GraphObserver {
    (event: GraphListenerEvent) : void 
}

export class GraphListenerEvent {
    eventSelector: any
    eventKind: GraphListenerEventKind 
}

export enum GraphListenerEventKind {
    OnNodeClick
}
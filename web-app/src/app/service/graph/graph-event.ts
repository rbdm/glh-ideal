export class GraphListenerEvent {
    eventSelector: any
    eventKind: GraphListenerEventKind 

    constructor(eventSelector: number, eventKind: GraphListenerEventKind) {
        this.eventSelector = eventSelector
        this.eventKind = eventKind
    }
}

export enum GraphListenerEventKind {
    OnNodeClick,
    OnLinkClick,
    OnMouseClick,
}
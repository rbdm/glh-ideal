export class GlobalSelectionEvent {
    constructor(
        public nodeID: number, 
        public eventKind: GlobalSelectionEventKind, 
        public eventData?: any
    ) {

    } 
}

export enum GlobalSelectionEventKind {
    NodeSelection,
    NodeDeselection
}

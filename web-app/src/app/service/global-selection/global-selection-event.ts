export class GlobalSelectionEvent {
    constructor(
        public nodeID: number | null, 
        public eventKind: GlobalSelectionEventKind, 
        public eventData?: any
    ) {

    } 
}

export enum GlobalSelectionEventKind {
    NodeSelection,
    NodeDeselection,
    GlobalDeselection
}

export class LegalObject<DATA extends LegalData> {
  constructor(
    public prettyID: string,
    public objectData: DATA,
  ) { }  
}

export class LegalObjectLink<DATA extends LegalLinkData> {
  constructor(
    public prettyID: string,
    public weight: number,

    public sourceNode: LegalObjectNode<LegalLinkData>,
    public destinationNode: LegalObjectNode<LegalLinkData>,

    public objectData: DATA,
  ) { }
}

export class DirectedLegalObjectLink<DATA extends LegalLinkData> extends LegalObjectLink<LegalLinkData>  {
  constructor(
    public prettyID: string,
    public weight: number,

    public sourceNode: LegalObjectNode<LegalLinkData>,
    public destinationNode: LegalObjectNode<LegalLinkData>,

    public objectData: DATA,
  ) {
    super(prettyID, weight, sourceNode, destinationNode, objectData)
  }
}

export class LegalObjectNode<LegalObjectData> {
  constructor(
    public prettyID: string, 
    public objectData: LegalObjectData,
  ) { }
}

export class LegalData {

}

export class LegalLinkData extends LegalData {
  constructor() {
    super()
  }
}


export class LegalNodeData extends LegalData {

}

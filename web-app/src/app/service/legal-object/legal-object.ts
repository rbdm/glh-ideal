export class LegalObjectNode<LegalObjectData> {
  constructor(
    public prettyID: string, 
    public objectData: LegalObjectData,
    public objectType: LegalObjectType
  ) { }

  typeToString(): string {
    return LegalObjectType[this.objectType]
  }
}

export class LegalObjectData {

}

export enum LegalObjectType {
  Person,
  Event,
  Location,
  Legislation,
  Amendment
}

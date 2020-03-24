import { FormArray, FormGroup } from '@angular/forms'

export abstract class LegalObject<DATA extends LegalData> {
  constructor(
    public classType: string,
    public prettyID: string,
    public objectData: DATA,
  ) { }  
}

export class LegalObjectLink<DATA extends LegalLinkData> {
  constructor(
    public classType: string,
    public prettyID: string,
    public weight: number,

    public sourceNode: LegalObject<LegalData>,
    public destinationNode: LegalObject<LegalData>,

    public objectData: DATA,
  ) { }
}

export class DirectedLegalObjectLink<DATA extends LegalLinkData> extends LegalObjectLink<DATA>  {
  constructor(
    public classType: string,
    public prettyID: string,
    public weight: number,

    public sourceNode: LegalObjectNode<LegalLinkData>,
    public destinationNode: LegalObjectNode<LegalLinkData>,

    public objectData: DATA,
  ) {
    super(classType, prettyID, weight, sourceNode, destinationNode, objectData)
  }
}

export abstract class LegalObjectNode<DATA extends LegalNodeData> extends LegalObject<DATA> {
  abstract get editorFormGroup(): FormGroup
  abstract get editorFormArray(): FormArray
  abstract get editorFormPlaceholders(): string[]
  abstract get editorFormTypeAheads(): string[][]

  /**
   * Update the object with the values in the form.
   */
  abstract update(): any;

  constructor(
    public classType: string,
    public prettyID: string, 
    public objectData: DATA,
  ) {
    super(classType, prettyID, objectData)
  }
}

export class LegalData {

}

export class LegalLinkData extends LegalData {

}

export class LegalNodeData extends LegalData {

}

import { FormArray, FormGroup, FormControl } from '@angular/forms'

export abstract class LegalObject<DATA extends LegalData> {
  abstract classType: string
  abstract prettyID: string
  abstract objectData: DATA
  
  abstract get editorFormGroup(): FormGroup
  abstract get editorFormArray(): FormArray
  abstract get editorFormPlaceholders(): string[]
  abstract get editorFormTypeAheads(): string[][]

  /**
   * Update the object with the values in the form.
   */
  abstract update(): any;
}

export abstract class LegalObjectLink<DATA extends LegalLinkData> { 
  abstract classType: string
  abstract prettyID: string
  
  abstract sourceNode: LegalObject<LegalData>
  abstract destinationNode: LegalObject<LegalData>
  
  abstract objectData: DATA

  abstract get editorFormGroup(): FormGroup
  abstract get editorFormArray(): FormArray
  abstract get editorFormPlaceholders(): string[]
  abstract get editorFormTypeAheads(): string[][]

  abstract get editorSourceNode(): FormControl
  abstract get editorDestinationNode(): FormControl

  /**
   * Update the object with the values in the form.
   */
  abstract update(): any;
}

export abstract class LegalData {

}

export abstract class LegalLinkData {
  abstract weight: number
}

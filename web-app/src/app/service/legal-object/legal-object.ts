import { FormArray, FormGroup, FormControl } from '@angular/forms'

export abstract class LegalObject<DATA extends LegalData> {
  abstract classType: string
  abstract prettyID: string
  abstract objectData: DATA
  
  abstract get editorFormGroup(): FormGroup
  abstract get editorFormArray(): FormArray
  abstract get editorFormPlaceholders(): string[] | null
  abstract get editorFormTypeAheads(): string[][] | null 

  /**
   * Update the object with the values in the form.
   */
  abstract update(): any;
}

export abstract class LegalObjectLink<DATA extends LegalLinkData> { 
  abstract classType: string
  abstract prettyID: string
  
  abstract sourceNode: LegalObject<LegalData> | undefined
  abstract destinationNode: LegalObject<LegalData>  | undefined
  
  abstract objectData: DATA

  abstract get editorFormGroup(): FormGroup
  abstract get editorFormArray(): FormArray
  abstract get editorFormPlaceholders(): string[] | null
  abstract get editorFormTypeAheads(): string[][] | null 

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

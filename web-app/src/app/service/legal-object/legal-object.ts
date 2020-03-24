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

export abstract class LegalObjectLink<DATA extends LegalData> { 
  abstract classType: string
  abstract prettyID: string
  
  // abstract weight: number
  
  abstract sourceNode: LegalObject<LegalData>
  abstract destinationNode: LegalObject<LegalData>
  
  abstract objectData: DATA

  // abstract get editorFormGroup(): FormGroup
  // abstract get editorFormArray(): FormArray
  // abstract get editorFormPlaceholders(): string[]
  // abstract get editorFormTypeAheads(): string[][]

  // /**
  //  * Update the object with the values in the form.
  //  */
  // abstract update(): any;
}

export class LegalData {

}

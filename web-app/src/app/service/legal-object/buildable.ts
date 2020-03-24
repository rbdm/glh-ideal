import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { LegalObjectLink, LegalData } from './legal-object';

export abstract class BuildableLink<T extends LegalObjectLink<LegalData>> {
    abstract formGroup: FormGroup
    abstract formNames: string[]
    abstract formBuilder: FormBuilder

    abstract get inner(): FormArray

    abstract build(): T

    pathEndForms: FormGroup = new FormGroup({
        sourceNode: new FormControl(''),
        destinationNode: new FormControl('')
    })
    
    get sourceNodeForm(): FormControl {
        return this.pathEndForms.get('sourceNode') as FormControl
    }    
    
    get destinationNodeForm(): FormControl {
        return this.pathEndForms.get('destinationNode') as FormControl
    }
}

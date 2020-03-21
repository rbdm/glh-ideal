import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

export class BuildableByForm {

    formGroup: FormGroup
    formNames: string[]

    constructor(public formBuilder: FormBuilder) { }

    get inner(): FormArray {
        return this.formGroup.get('inner') as FormArray;
    }
}


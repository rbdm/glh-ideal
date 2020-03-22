import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

export abstract class BuildableByForm<T> {

    abstract formGroup: FormGroup
    abstract formNames: string[]
    abstract formBuilder: FormBuilder

    abstract get inner(): FormArray

    abstract build(): T
}


import { FormGroup, FormArray } from '@angular/forms';

import { LegalObjectNode } from '../legal-object';
import { BuildableByForm } from './buildable';

export class Person extends LegalObjectNode {
    constructor(prettyID: string, machineID: number, inner: PersonDetails) {
        super(prettyID, machineID, inner)
    }
}

export class PersonDetails {
    dateOfBirth: any
}

export class PersonBuilder extends BuildableByForm {
    formNames: string[] = [
        'Name',
        'Date of Birth',
        'Place of Birth'
    ]

    formGroup: FormGroup = this.formBuilder.group({ 
        inner: this.formBuilder.array([
            this.formBuilder.control(''),
            this.formBuilder.control(''),
            this.formBuilder.control('')
        ])
    })
}

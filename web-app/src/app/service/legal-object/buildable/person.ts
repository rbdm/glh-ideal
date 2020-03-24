import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { LegalObjectNode, LegalNodeData } from '../legal-object';
import { BuildableNode } from './buildable';

export class Person extends LegalObjectNode<PersonData> {
    constructor(prettyID: string, objectData: PersonData) {
        super(prettyID, objectData)
    }
}

export class PersonData extends LegalNodeData {
    dateOfBirth: any
    placeOfBirth: any
    name: any
    
}

export class PersonBuilder extends BuildableNode<Person> {
    formBuilder = new FormBuilder

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

    get inner(): FormArray {
        return this.formGroup.get('inner') as FormArray;
    }

    build(): Person {
        const controls = this.inner.controls

        const personNameIndex: number = 0
        const personName: string = controls[personNameIndex].value

        const personDateOfBirthIndex: number = 1
        const personDateOfBirth: any = controls[personDateOfBirthIndex].value

        const personPlaceOfBirthIndex: number = 2
        const personPlaceOfBirth: any = controls[personPlaceOfBirthIndex].value

        const personData: PersonData = {
            name: personName,
            dateOfBirth: personDateOfBirth,
            placeOfBirth: personPlaceOfBirth
        }

        return new Person(personName, personData)
    }
}

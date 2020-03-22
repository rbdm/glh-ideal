import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { LegalObjectNode, LegalObjectData, LegalObjectType } from '../legal-object';
import { BuildableByForm } from './buildable';

export class Person extends LegalObjectNode<PersonData> {
    constructor(prettyID: string, objectData: PersonData) {
        super(prettyID, objectData, LegalObjectType.Person)
    }
}

export class PersonData extends LegalObjectData {
    dateOfBirth: any
    placeOfBirth: any
    name: any
    
}

export class PersonBuilder extends BuildableByForm<Person> {
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
        const personNameIndex: number = 0
        const personName: string = this.inner.controls[personNameIndex].value

        const personDateOfBirthIndex: number = 1
        const personDateOfBirth: any = this.inner.controls[personDateOfBirthIndex].value

        const personPlaceOfBirthIndex: number = 2
        const personPlaceOfBirth: any = this.inner.controls[personPlaceOfBirthIndex].value

        const personData: PersonData = {
            name: personName,
            dateOfBirth: personDateOfBirth,
            placeOfBirth: personPlaceOfBirth
        }

        return new Person(personName, personData)
    }
}

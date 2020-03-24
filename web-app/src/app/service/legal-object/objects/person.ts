import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { LegalObjectNode, LegalNodeData } from '../legal-object';

const personFormPlaceholders: string[] = [
    'Name',
    'Date of Birth',
    'Place of Birth'
]

const personFormGroupControls: FormGroup = new FormGroup({ 
    inner: new FormArray([
        new FormControl(''),
        new FormControl(''),
        new FormControl('')
    ])
})

export class Person extends LegalObjectNode<PersonData> {
    private personFormGroupControlsCopy: FormGroup

    get editorFormGroup(): FormGroup {
        return this.personFormGroupControlsCopy
    }

    get editorFormArray(): FormArray {
        return this.personFormGroupControlsCopy.get('inner') as FormArray
    }

    get editorFormPlaceholders(): string[] {
        return personFormPlaceholders
    }

    get editorFormTypeAheads(): string[][] {
        return undefined
    }

    constructor(prettyID: string, objectData: PersonData) {
        super('Person', prettyID, objectData)
        this.personFormGroupControlsCopy = Object.create(personFormGroupControls)
    }

    update(): any {
        const controls = this.personFormGroupControlsCopy
        
        const nameIndex: number = 0
        const nameControl: string = controls[nameIndex]
        if (nameControl) {
            this.objectData.name = nameControl
        }

        const dateOfBirthIndex: number = 1
        const dateOfBirthControl: string = controls[dateOfBirthIndex]
        if (dateOfBirthControl) {
            this.objectData.dateOfBirth = dateOfBirthControl
        }

        const placeOfBirthIndex: number = 2
        const placeOfBirthControl: string = controls[placeOfBirthIndex]
        if (nameControl) {
            this.objectData.placeOfBirth = placeOfBirthControl
        }
    }
}

export class PersonData extends LegalNodeData {
    dateOfBirth: any
    placeOfBirth: any
    name: any
}

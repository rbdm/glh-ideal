import { FormGroup, FormArray, FormBuilder, FormControl, Form } from '@angular/forms';
import { LegalObject, LegalData } from '../legal-object';

export class Person extends LegalObject<PersonData> {
    classType: string = 'Person'

    private personFormPlaceholders: string[] = [
        'Name',
        'Date of Birth',
        'Place of Birth'
    ]

    private personFormGroupControls: FormGroup = new FormGroup({ 
        inner: new FormArray([
            new FormControl(''),
            new FormControl(''),
            new FormControl('')
        ])
    })

    get editorFormGroup(): FormGroup {
        return this.personFormGroupControls
    }

    get editorFormArray(): FormArray {
        return this.personFormGroupControls.get('inner') as FormArray
    }

    get editorFormPlaceholders(): string[] {
        return this.personFormPlaceholders
    }

    get editorFormTypeAheads(): string[][] {
        return undefined
    }

    constructor(public prettyID: string, public objectData: PersonData) {
        super()
    }

    update(): any {
        const controls: FormArray = this.editorFormArray
        
        const nameIndex: number = 0
        const nameControl: FormControl = controls[nameIndex]
        if (nameControl) {
            this.objectData.name = nameControl.value
            this.prettyID = nameControl.value
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

export class PersonData extends LegalData {
    dateOfBirth: any
    placeOfBirth: any
    name: any
}

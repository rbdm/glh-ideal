import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
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
        return [[]]
    }

    constructor(public prettyID: string, public objectData: PersonData) {
        super()
    }

    update(): any {
        const controls: AbstractControl[] = this.editorFormArray.controls
        
        const nameIndex: number = 0
        const nameControl: AbstractControl = controls[nameIndex]
        if (nameControl) {
            this.objectData.name = nameControl.value
            this.prettyID = nameControl.value
        }


        const dateOfBirthIndex: number = 1
        const dateOfBirthControl: AbstractControl = controls[dateOfBirthIndex]
        if (dateOfBirthControl) {
            this.objectData.dateOfBirth = dateOfBirthControl.value
        }

        const placeOfBirthIndex: number = 2
        const placeOfBirthControl: AbstractControl = controls[placeOfBirthIndex]
        if (nameControl) {
            this.objectData.placeOfBirth = placeOfBirthControl.value
        }
    }
}

export class PersonData extends LegalData {
    dateOfBirth: string = ''
    placeOfBirth: string = ''
    name: string = ''
}

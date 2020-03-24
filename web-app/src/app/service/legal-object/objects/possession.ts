import { LegalObject, LegalObjectLink, LegalData, LegalLinkData } from '../legal-object';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

export class Possession extends LegalObjectLink<PossessionData> {
    classType = 'Possession'

    private possessionFormGroupControls: FormGroup = new FormGroup({
        sourceNode: new FormControl(''),
        destinationNode: new FormControl(''),
        inner: new FormArray([
            new FormControl('')
        ])
    })

    private possessionFormPlaceholders: string[] = [
        'Description of Relationship'
    ]

    get editorFormGroup(): FormGroup {
        return this.possessionFormGroupControls
    }

    get editorFormArray(): FormArray {
        return this.possessionFormGroupControls.get('inner') as FormArray
    }

    get editorFormPlaceholders(): string[] | null {
        return this.possessionFormPlaceholders
    }

    get editorFormTypeAheads(): string[][] | null {
        // TODO.
        return null
    }

    get editorSourceNode(): FormControl {
        return this.possessionFormGroupControls.get('sourceNode') as FormControl
    }

    get editorDestinationNode(): FormControl {
        return this.possessionFormGroupControls.get('destinationNode') as FormControl
    }

    /**
     * Update the object with the values in the form.
     */
    update(): any {
        // TODO.
    }

    constructor(
        public prettyID: string,
        public sourceNode: LegalObject<LegalData> | undefined,
        public destinationNode: LegalObject<LegalData> | undefined,
        public objectData: PossessionData
    ) {
        super()
    }
}

export class PossessionData extends LegalLinkData {
    weight: number
    description: string  = ''

    constructor(weight: number | undefined, description?: string) {
        super()
        
        if (!weight){
            this.weight = 1
        } else {
            this.weight = weight
        }

        if (description) {
            this.description = description
        }
    }
}

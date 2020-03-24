import { LegalObject, LegalObjectLink, LegalData, LegalLinkData } from '../legal-object';
import { BuildableLink } from '../buildable';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { DataModelService } from '../../data/data-model.service';

export class Possession extends LegalObjectLink<PossessionData> {
    get editorFormGroup(): FormGroup {
        // TODO.
        return null
    }

    get editorFormArray(): FormArray {
        // TODO.
        return null
    }

    get editorFormPlaceholders(): string[] {
        // TODO.
        return null
    }

    get editorFormTypeAheads(): string[][] {
        // TODO.
        return null
    }

    get editorSourceNode(): FormControl {
        // TODO.
        return null
    }

    get editorDestinationNode(): FormControl {
        // TODO.
        return null
    }

    /**
     * Update the object with the values in the form.
     */
    update(): any {
        // TODO.
    }

    constructor(
        public classType: string,
        public prettyID: string,
        public sourceNode: LegalObject<LegalData>,
        public destinationNode: LegalObject<LegalData>,
        public objectData: PossessionData
    ) {
        super()
    }
}

export class PossessionData extends LegalLinkData {
    weight: number | undefined
    description: string  | undefined
}

export class PossessionBuilder extends BuildableLink<Possession> {

    formBuilder = new FormBuilder

    formNames: string[] = [
        'Description'
    ]

    formGroup: FormGroup = this.formBuilder.group({
        inner: this.formBuilder.array([
            this.formBuilder.control('')
        ]),
    })

    get inner(): FormArray {
        return this.formGroup.get('inner') as FormArray
    }

    constructor(private dataService: DataModelService) {
        super()
    }

    build(): Possession {
        const controls = this.inner.controls
        
        const fromValue: string = this.sourceNodeForm.value
        const from: LegalObject<LegalData> = this.dataService.lookUpNodeByPrettyID(fromValue)

        const toValue: string = this.destinationNodeForm.value
        const to: LegalObject<LegalData> = this.dataService.lookUpNodeByPrettyID(toValue)

        const descriptionIndex: number = 0
        const description: string = controls[descriptionIndex].value

        const possessionData: PossessionData = {
            weight: undefined,
            description: description
        }

        return new Possession('Possession', name, from, to, possessionData)
    }   
}

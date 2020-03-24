import { LegalObject, LegalObjectLink, LegalData } from '../legal-object';
import { BuildableLink } from '../buildable';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DataModelService } from '../../data/data-model.service';

export class Possession extends LegalObjectLink<PossessionData> {
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

export class PossessionData extends LegalData {
    description: string
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
            description: description
        }

        return new Possession('Possession', name, from, to, possessionData)
    }   
}

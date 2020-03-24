import { DirectedLegalObjectLink, LegalLinkData, LegalObjectNode, LegalNodeData, LegalData } from '../legal-object';
import { BuildableLink } from '../buildable';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DataModelService } from '../../data/data-model.service';

export class Possession extends DirectedLegalObjectLink<PossessionData> {
    constructor(
        classType: string,
        prettyID: string,
        sourceNode: LegalObjectNode<LegalNodeData>,
        destinationNode: LegalObjectNode<LegalNodeData>,
        objectData: PossessionData
    ) {
        super(classType, prettyID, 2, sourceNode, destinationNode, objectData)
    }
}

export class PossessionData extends LegalLinkData {
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
        const from: LegalObjectNode<LegalNodeData> = this.dataService.lookUpNodeByPrettyID(fromValue)

        const toValue: string = this.destinationNodeForm.value
        const to: LegalObjectNode<LegalNodeData> = this.dataService.lookUpNodeByPrettyID(toValue)

        const descriptionIndex: number = 0
        const description: string = controls[descriptionIndex].value

        const possessionData: PossessionData = {
            description: description
        }

        return new Possession('Possession', name, from, to, possessionData)
    }   
}

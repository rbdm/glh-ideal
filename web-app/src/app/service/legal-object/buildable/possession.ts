import { DirectedLegalObjectLink, LegalLinkData, LegalObjectNode, LegalNodeData } from '../legal-object';
import { BuildableByForm } from './buildable';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

export class Possession extends DirectedLegalObjectLink<PossessionData> {
    constructor(
        prettyID: string,
        sourceNode: LegalObjectNode<LegalNodeData>,
        destinationNode: LegalObjectNode<LegalNodeData>,
        objectData: PossessionData
    ) {
        super(prettyID, sourceNode, destinationNode, objectData)
    }
}

export class PossessionData extends LegalLinkData {
    possessor: number
    possessed: number
    name: string
    description: string
}

export class PossessionBuilder extends BuildableByForm<Possession> {
    sourceNode: LegalObjectNode<LegalNodeData>
    destinationNode: LegalObjectNode<LegalNodeData>

    formBuilder = new FormBuilder

    formNames: string[] = [
        'Possessor',
        'Possessed',
        'Name',
        'Description'
    ]

    formGroup: FormGroup = this.formBuilder.group({
        inner: this.formBuilder.array([
            this.formBuilder.control(''),
            this.formBuilder.control(''),
            this.formBuilder.control(''),
            this.formBuilder.control('')
        ])
    })

    get inner(): FormArray {
        return this.formGroup.get('inner') as FormArray
    }

    build(): Possession {
        const controls = this.inner.controls

        const possessorIndex: number = 0
        const possessor: number = controls[possessorIndex].value
        
        const possessedIndex: number = 1
        const possessed: number = controls[possessedIndex].value
        
        const nameIndex: number = 2
        const name: string = controls[nameIndex].value

        const descriptionIndex: number = 3
        const description: string = controls[descriptionIndex].value

        const possessionData: PossessionData = {
            possessor: possessor,
            possessed: possessed,
            name: name,
            description: description
        }

        return new Possession(name, this.sourceNode, this.destinationNode, possessionData)
    }   
}

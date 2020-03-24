import { LegalObject, LegalObjectLink, LegalData, LegalLinkData } from '../legal-object';
import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { DataModelService } from '../../data/data-model.service';

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

    get editorFormPlaceholders(): string[] {
        return this.possessionFormPlaceholders
    }

    get editorFormTypeAheads(): string[][] {
        return [[]]
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
        const controls: AbstractControl[] = this.editorFormArray.controls

        const sourceNodePrettyID: string = this.editorSourceNode.value
        const sourceNodeLookUpResult = this.dataService.lookUpNodeByPrettyID(sourceNodePrettyID)
        if (!sourceNodeLookUpResult) {
            throw Error('Could not parse the source node\'s \'prettyID\' as a valid node.')
        }
        this.sourceNode = sourceNodeLookUpResult

        const destinationNodePrettyID: string = this.editorDestinationNode.value
        const destinationNodeLookUpResult = this.dataService.lookUpNodeByPrettyID(destinationNodePrettyID)
        if (!destinationNodeLookUpResult) {
            throw Error('Could not parse destination node\'s \'prettyID\' as a valid node')
        }
        this.destinationNode = destinationNodeLookUpResult

        const description: string = controls[0].value
        this.objectData.description = description
        console.log(this)
    }

    constructor(
        public prettyID: string,
        public sourceNode: LegalObject<LegalData> | undefined,
        public destinationNode: LegalObject<LegalData> | undefined,
        public objectData: PossessionData,
        private dataService: DataModelService
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

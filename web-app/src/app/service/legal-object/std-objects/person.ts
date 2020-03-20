import { LegalObjectNode } from '../legal-object.service';

export class Person extends LegalObjectNode {
    machineID: number
    prettyID: string
    inner: any

    returnOnSearch: string[]

    super(machineID: number, prettyID: string, inner: any) {
        // Constructor called on super-class
    }
}
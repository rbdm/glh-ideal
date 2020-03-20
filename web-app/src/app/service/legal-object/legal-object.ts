export class LegalObjectNode {
    humanReadableID: string
    machineID: number

    innerData: any

    constructor(humanReadableID: string, machineID: number, innerData: any) {
        this.humanReadableID = humanReadableID
        this.machineID = machineID
        this.innerData = innerData
    }
}
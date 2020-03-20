export class LegalObjectNode {
    prettyID: string
    machineID: number

    inner: any

    constructor(prettyID: string, machineID: number, inner: any) {
        this.prettyID = prettyID
        this.machineID = machineID
        this.inner = inner
    }
}
import { Injectable, Component } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class LegalObjectService {

  knownLegalObjects: string[] = [
    'Person',
    'Legislation',
    'Event'
  ]

  constructor() { }
}

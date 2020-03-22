import { Injectable } from '@angular/core';
import { BuildableByForm } from './buildable/buildable';
import { PersonBuilder, PersonData } from './buildable/person';
import { LegalObjectNode, LegalNodeData } from './legal-object';
import { PossessionBuilder } from './buildable/possession';

@Injectable({
  providedIn: 'root'
})
export class LegalObjectService {

  knownLegalObjectsString = [
    'Person',
    'Event',
    'Legislation'
  ]

  knownLegalLinksString = [
    'Possession'
  ]

  constructor() { }

  getBuilder(searchTerm: string): BuildableByForm<any> {
    switch (searchTerm) {
      case 'Person':
        return new PersonBuilder()
      case 'Possession':
        return new PossessionBuilder()
    }
  }
}

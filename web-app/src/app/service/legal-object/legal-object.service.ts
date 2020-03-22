import { Injectable } from '@angular/core';
import { BuildableByForm } from './buildable/buildable';
import { PersonBuilder, PersonData } from './buildable/person';
import { LegalObjectNode, LegalObjectData } from './legal-object';

@Injectable({
  providedIn: 'root'
})
export class LegalObjectService {

  knownLegalObjectsString = [
    'Person',
    'Event',
    'Legislation'
  ]

  constructor() { }

  getForm(searchTerm: string): BuildableByForm<LegalObjectNode<LegalObjectData>> {
    switch (searchTerm) {
      case 'Person':
        return new PersonBuilder()
    }
  }
}

import { Injectable } from '@angular/core';
import { BuildableByForm } from './buildable/buildable';
import { PersonBuilder } from './buildable/person';
import { FormBuilder } from '@angular/forms';

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

  getForm(searchTerm: string): BuildableByForm {
    switch (searchTerm) {
      case 'Person':
        return new PersonBuilder(new FormBuilder)
    }
  }
}

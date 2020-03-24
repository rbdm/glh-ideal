import { Injectable } from '@angular/core';
import { Person, PersonData } from './objects/person';
import { DataModelService } from '../data/data-model.service';
import { LegalObject, LegalData, LegalObjectLink, LegalLinkData } from './legal-object';
import { Possession, PossessionData } from './objects/possession';


@Injectable({
  providedIn: 'root'
})
export class LegalObjectService {

  knownLegalObjectsString = [
    'Person',
  ]

  knownLegalLinksString = [
    'Possession'
  ]

  constructor(public dataService: DataModelService) { }

  getBuilder(searchTerm: string): LegalObject<LegalData> | null {
    switch (searchTerm) {
      case 'Person':
        return new Person('', new PersonData)
    }
    return null;
  }

  getLinkBuilder(searchTerm: string): LegalObjectLink<LegalLinkData> | null {
    switch (searchTerm) {
      case 'Possession':
        return new Possession('', undefined, undefined, new PossessionData(undefined, ''))
    }
    return null;
  }
}

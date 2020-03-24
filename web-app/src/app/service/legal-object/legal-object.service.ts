import { Injectable } from '@angular/core';
import { BuildableLink } from './buildable';
import { Person, PersonData } from './objects/person';
import { PossessionBuilder } from './objects/possession';
import { DataModelService } from '../data/data-model.service';
import { LegalObject, LegalData } from './legal-object';


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

  getLinkBuilder(searchTerm: string): BuildableLink<any> | null {
    switch (searchTerm) {
      case 'Possession':
        return new PossessionBuilder(this.dataService)
    }
    return null;
  }
}

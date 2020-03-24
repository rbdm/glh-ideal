import { Injectable } from '@angular/core';
import { BuildableNode, BuildableLink } from './buildable/buildable';
import { PersonBuilder, PersonData } from './buildable/person';
import { LegalObjectNode, LegalNodeData } from './legal-object';
import { PossessionBuilder } from './buildable/possession';
import { DataModelService } from '../data/data-model.service';

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

  constructor(public dataService: DataModelService) { }

  getBuilder(searchTerm: string): BuildableNode<any> {
    switch (searchTerm) {
      case 'Person':
        return new PersonBuilder()
    }
  }

  getLinkBuilder(searchTerm: string): BuildableLink<any> {
    switch (searchTerm) {
      case 'Possession':
        return new PossessionBuilder(this.dataService)
    }
  }
}

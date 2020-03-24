import { Injectable } from '@angular/core';
import { BuildableLink } from './buildable';
import { Person } from './objects/person';
import { PossessionBuilder } from './objects/possession';
import { DataModelService } from '../data/data-model.service';
import { LegalObjectNode, LegalNodeData } from './legal-object';

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

  getBuilder(searchTerm: string): LegalObjectNode<LegalNodeData> {
    switch (searchTerm) {
      case 'Person':
        return new Person(null, null)
    }
  }

  getLinkBuilder(searchTerm: string): BuildableLink<any> {
    switch (searchTerm) {
      case 'Possession':
        return new PossessionBuilder(this.dataService)
    }
  }
}

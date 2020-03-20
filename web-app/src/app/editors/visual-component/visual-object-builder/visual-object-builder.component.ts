import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';

import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';


@Component({
  selector: 'app-visual-object-builder',
  templateUrl: './visual-object-builder.component.html',
  styleUrls: ['./visual-object-builder.component.css']
})
export class ObjectBuilderComponent implements OnInit {

  typeaheadMinLength = 0
  typeaheadSingleWords = true
  typeaheadScrollable = true
  typeaheadOptionsInScrollableView = 5
  typeaheadHideResultsOnBlur = true

  constructor(
    private dataModelService: DataModelService, 
    private legalService: LegalObjectService
  ) { }

  userSelection: string
  typeAheadValues = this.legalService.knownLegalObjects 


  ngOnInit(): void { }

  addLegalObject(id: string, data: any) {
    this.dataModelService.addLegalObject(id, data)
  }

  onTypeAheadSelect(event: any) {
    console.log('Got an event.')
  }
}

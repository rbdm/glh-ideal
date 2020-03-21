import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';
import { FormGroup, FormArray } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { BuildableByForm } from 'src/app/service/legal-object/buildable/buildable';


@Component({
  selector: 'app-visual-object-builder',
  templateUrl: './visual-object-builder.component.html',
  styleUrls: ['./visual-object-builder.component.css']
})
export class ObjectBuilderComponent implements OnInit {

  @ViewChild('template') templateView: TemplateRef<any> 
  modalRef: BsModalRef

  typeaheadMinLength = 0
  typeaheadSingleWords = true
  typeaheadScrollable = true
  typeaheadOptionsInScrollableView = 5
  typeaheadHideResultsOnBlur = true
  typeAheadValues = this.legalService.knownLegalObjectsString

  userSelection: string
  
  objectBuilder: BuildableByForm
  objectBuilderTitle: string
  objectBuilderForm: FormGroup

  constructor(
    private dataModelService: DataModelService, 
    private legalService: LegalObjectService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void { }

  addLegalObject(id: string, data: any) {
    this.dataModelService.addLegalObject(id, data)
  }

  onTypeAheadSelect(event: TypeaheadMatch) {
    this.objectBuilderTitle = event.value
    this.objectBuilder = this.legalService.getForm(event.value)
    this.objectBuilderForm = this.objectBuilder.formGroup

    this.openModal(this.templateView)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onCancel() {

  }

  onSubmit() {
    console.log(this.objectBuilder.formGroup.value)
    this.modalRef.hide()
  }
}
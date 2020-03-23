import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';
import { FormGroup, FormArray } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { BuildableByForm } from 'src/app/service/legal-object/buildable/buildable';
import { LegalObjectNode, LegalNodeData } from 'src/app/service/legal-object/legal-object';


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

  userSelectionBuffer: string
  
  modalTitle: string
  
  objectBuilder: BuildableByForm<LegalObjectNode<LegalNodeData>>
  objectBuilderForm: FormGroup

  constructor(
    private dataModelService: DataModelService, 
    private legalService: LegalObjectService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void { }

  addLegalObject(data: LegalObjectNode<LegalNodeData>) {
    this.dataModelService.addLegalObject(data)
  }

  onTypeAheadSelect(event: TypeaheadMatch) {
    this.modalTitle = event.value
    this.objectBuilder = this.legalService.getBuilder(event.value)
    this.objectBuilderForm = this.objectBuilder.formGroup

    this.openModal(this.templateView)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { animated: false });
  }

  onCancel() {
    this.modalRef.hide()
  }

  onSubmit() {
    this.modalRef.hide()

    const builtObject: LegalObjectNode<LegalNodeData> = this.objectBuilder.build()
    this.addLegalObject(builtObject)
  }
}

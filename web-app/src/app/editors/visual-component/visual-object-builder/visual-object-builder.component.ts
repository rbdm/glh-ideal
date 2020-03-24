import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';
import { FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { LegalObject, LegalData } from 'src/app/service/legal-object/legal-object';


@Component({
  selector: 'app-visual-object-builder',
  templateUrl: './visual-object-builder.component.html',
  styleUrls: ['./visual-object-builder.component.css']
})
export class ObjectBuilderComponent implements OnInit {

  @ViewChild('template') templateView: TemplateRef<any> | undefined = undefined 
  modalRef: BsModalRef | undefined = undefined
  modalConfig = {
    animated: false
  }

  typeaheadMinLength = 0
  typeaheadSingleWords = true
  typeaheadScrollable = true
  typeaheadOptionsInScrollableView = 5
  typeaheadHideResultsOnBlur = true
  
  nodeTypeAheadValues = this.legalService.knownLegalObjectsString

  userNodeSelectionBuffer: string = ''
  nodeSelectionPlaceholder: string = 'New object'
  
  modalTitle: string = ''
  
  emptyObject: LegalObject<LegalData> | undefined = undefined 
  objectEditorForm: FormGroup | undefined = undefined

  constructor(
    private dataModelService: DataModelService, 
    private legalService: LegalObjectService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void { }

  addLegalObject(data: LegalObject<LegalData>) {
    this.dataModelService.addLegalObject(data)
  }

  onTypeAheadSelect(event: TypeaheadMatch) {
    const getBuilderResult: LegalObject<LegalData> | null = this.legalService.getBuilder(event.value)
    if (!getBuilderResult) {
      throw Error('Failed to fetch a legal object that can be built from a form.')
    }
    this.emptyObject = getBuilderResult
    this.objectEditorForm = this.emptyObject.editorFormGroup

    this.modalTitle = event.value

    if (!this.templateView) {
      throw Error('The template defining the modal is undefined.')
    }
    this.openModal(this.templateView)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  onCancel() {
    if (!this.modalRef) {
      throw Error('Could not cancel the modal ref, because the modal ref is currently undefined')
    }
    this.modalRef.hide()
    this.userNodeSelectionBuffer = ''
  }

  onSubmit() {
    if (!this.modalRef) {
      throw Error('Could not submit the form on the modal ref, because the modal ref is currently undefined')
    }
    this.modalRef.hide()
    this.userNodeSelectionBuffer = ''

    if (!this.emptyObject) {
      throw Error('Could not update the legal object with form values, because the legal object is undefined.')
    }
    this.emptyObject.update()
    this.addLegalObject(this.emptyObject)
  }
}

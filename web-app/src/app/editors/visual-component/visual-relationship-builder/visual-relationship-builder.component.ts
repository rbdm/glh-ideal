import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';
import { FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { LegalObjectLink, LegalLinkData } from 'src/app/service/legal-object/legal-object';

@Component({
  selector: 'app-visual-relationship-builder',
  templateUrl: './visual-relationship-builder.component.html',
  styleUrls: ['./visual-relationship-builder.component.css']
})
export class VisualRelationshipBuilderComponent implements OnInit {
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
  
  linkTypeAheadValues = this.legalService.knownLegalLinksString

  userLinkSelectionBuffer: string = ''
  linkSelectionPlaceholder: string = 'New relationship'

  modalTitle: string | undefined
  
  emptyObject: LegalObjectLink<LegalLinkData> | undefined
  objectEditorForm: FormGroup | undefined

  constructor(
    public dataModelService: DataModelService, 
    private legalService: LegalObjectService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void { }

  addLegalLink(legalLink: LegalObjectLink<LegalLinkData>) {
    this.dataModelService.addDirectedLegalLink(legalLink)
  }

  onTypeAheadSelect(event: TypeaheadMatch) {
    this.modalTitle = event.value

    const getLinkBuilderResult = this.legalService.getLinkBuilder(event.value)
    if (!getLinkBuilderResult) {
      throw Error('Failed to fetch a legal object that can be built from a form.')
    }
    this.emptyObject = getLinkBuilderResult
    this.objectEditorForm = this.emptyObject.editorFormGroup

    if (!this.templateView) {
      throw Error('The template defining the modal is undefined.')
    }
    this.openModal(this.templateView)
  }

  openModal(template: TemplateRef<any>) {
    if (!this.emptyObject) {
      throw Error('There is no object selected for the modal form to display and edit.')
    }
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  onCancel() {
    if (!this.modalRef) {
      throw Error('Could not cancel the modal ref, because the modal ref is currently undefined')
    }
    this.modalRef.hide()
    this.userLinkSelectionBuffer = ''
  }

  onSubmit() {
    if (!this.modalRef) {
      throw Error('Could not submit the form on the modal ref, because the modal ref is currently undefined')
    }
    this.modalRef.hide()
    this.userLinkSelectionBuffer = ''

    if (!this.emptyObject) {
      throw Error('Could not update the legal object with form values, because the legal object is undefined.')
    }
    this.emptyObject.update()
    this.addLegalLink(this.emptyObject)
  }
}

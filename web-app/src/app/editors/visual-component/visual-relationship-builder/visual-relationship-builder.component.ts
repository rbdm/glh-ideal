import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';
import { FormGroup, AbstractControl } from '@angular/forms';
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
      throw Error(this.UndefinedModalRef)
    }
    this.openModal(this.templateView)
  }

  openModal(template: TemplateRef<any>) {
    if (!this.emptyObject) {
      throw Error(this.UndefinedObjectBuilder)
    }
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  onCancel() {
    if (!this.modalRef) {
      throw Error(this.UndefinedModalRef)
    }
    this.modalRef.hide()
    this.userLinkSelectionBuffer = ''
  }

  onSubmit() {
    this.hideModal()
    this.userLinkSelectionBuffer = ''

    if (!this.emptyObject) {
      throw Error(this.UndefinedObjectBuilder)
    }
    this.emptyObject.update()
    this.addLegalLink(this.emptyObject)
  }

  hideModal() {
    if (!this.modalRef) {
      throw Error(this.UndefinedModalRef)
    }
    this.modalRef.hide()  
  }

  indexObjectPlaceholders(index: number): string {
    const placeholders: string[] | null | undefined = this.emptyObject?.editorFormPlaceholders
    if (!placeholders) {
      throw Error('Could not find placeholders for this form.')
    }

    const placeholdersLength: number = placeholders.length
    if (index > placeholdersLength) {
      throw Error('Index for placeholder exceeds the length of the placeholders.')
    }

    return placeholders[index]
  } 

  getObjectFormArrayControls(): AbstractControl[] {
    const formArrayControls: AbstractControl[] | null | undefined = this.emptyObject?.editorFormArray.controls
    if (!formArrayControls) {
      throw Error(this.UndefinedObjectBuilder)
    }
    return formArrayControls
  }

  private UndefinedObjectBuilder = 'Could not update the legal object with form values, because the legal object is undefined.'
  private UndefinedModalRef = 'Could not submit the form on the modal ref, because the modal ref is currently undefined'

}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';
import { FormGroup, AbstractControl } from '@angular/forms';
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
      throw Error(this.UndefinedObjectBuilder)
    }
    this.emptyObject = getBuilderResult
    this.objectEditorForm = this.emptyObject.editorFormGroup

    this.modalTitle = event.value

    if (!this.templateView) {
      throw Error(this.UndefinedModalRef)
    }
    this.openModal(this.templateView)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  hideModal() {
    if (!this.modalRef) {
      throw Error(this.UndefinedModalRef)
    }
    this.modalRef.hide()
  }

  onCancel() {
    this.hideModal()
    this.userNodeSelectionBuffer = ''
  }

  onSubmit() {
    this.hideModal()
    this.userNodeSelectionBuffer = ''

    if (!this.emptyObject) {
      throw Error(this.UndefinedObjectBuilder)
    }
    this.emptyObject.update()
    this.addLegalObject(this.emptyObject)
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

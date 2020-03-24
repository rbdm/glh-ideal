import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';
import { FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { BuildableLink } from 'src/app/service/legal-object/buildable';
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
  
  objectBuilder: BuildableLink<LegalObjectLink<LegalLinkData>> | undefined
  objectBuilderForm: FormGroup | undefined

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
    this.objectBuilder = this.legalService.getLinkBuilder(event.value)
    this.objectBuilderForm = this.objectBuilder.formGroup

    this.openModal(this.templateView)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  onCancel() {
    this.modalRef.hide()
    this.userLinkSelectionBuffer = ''
  }

  onSubmit() {
    this.modalRef.hide()
    this.userLinkSelectionBuffer = ''

    const builtObject: LegalObjectLink<LegalLinkData> = this.objectBuilder.build()
    this.addLegalLink(builtObject)    
  }
}

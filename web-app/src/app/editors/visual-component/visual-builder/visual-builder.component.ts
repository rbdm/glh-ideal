import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, TypeaheadMatch, BsModalService } from 'ngx-bootstrap';
import { LegalData, LegalObject, LegalObjectLink, LegalLinkData } from 'src/app/service/legal-object/legal-object';
import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';

@Component({
  selector: 'app-visual-builder',
  templateUrl: './visual-builder.component.html',
  styleUrls: ['./visual-builder.component.css']
})
export class VisualBuilderComponent implements OnInit {

  constructor(
    public dataModel: DataModelService, 
    public legalService: LegalObjectService,
    public modalService: BsModalService
  ) { }

  private _currentlySelected: any | undefined = undefined

  @ViewChild('template') private _template: TemplateRef<any> | undefined = undefined

  modalTitle: string = ''
  searchType: string = ''

  modalRef: BsModalRef | undefined = undefined
  modalConfig: any = {
    animated: false
  }

  inputBuffer: any = {
    nodes: '',
    links: '',
  }

  typeAheadOptions: any = {
    minLength: 0,
    singleWords: true,
    scrollable: true,
    optionsInScrollableView: 5,
    hideResultsOnBlur: true
  }

  typeAheadPlaceholders: any = {
    nodes: 'Add object',
    links: 'Add relationship'
  }

  knownLegalObjects: string[] = this.legalService.knownLegalObjectsString
  knownLegalLinks: string[] = this.legalService.knownLegalLinksString

  public get currentSelection(): LegalObject<LegalData> | LegalObjectLink<LegalLinkData> {
    if (this._currentlySelected) {
      return this._currentlySelected
    } else {
      throw Error('Could not update the legal object with form values, because the legal object is undefined.')
    }
  }

  public get templateRef(): TemplateRef<any> {
    if (this._template) {
      return this._template
    } else {
      throw Error('Could not submit the form on the modal ref, because the modal ref is currently undefined')
    }
  }

  ngOnInit(): void {

  }

  refresh() {
    this.inputBuffer.links = ''
    this.inputBuffer.nodes = ''
    this.searchType = ''
    this.modalTitle = ''
  }

  onCancel() {
    this.hideModal()
    this.refresh()
  }

  showLinksModal(): boolean {
    return this.searchType == 'Links'
  }

  onSubmit() {
    this.hideModal()
    this.refresh()

    this.currentSelection.update()
    this.addData(this.currentSelection)
  }

  addData(data: LegalObject<LegalData> | LegalObjectLink<LegalLinkData>) {
    if (data instanceof LegalObject) {
      this.dataModel.addLegalObject(data)
    } else {
      this.dataModel.addDirectedLegalLink(data)
    }
  }

  onMatch(event: TypeaheadMatch, isNodeSearch: boolean) {
    this.modalTitle = event.value
    this.setCurrentlySelected(event.value, isNodeSearch)

    if (this.currentSelection instanceof LegalObjectLink) {
      this.searchType = 'Links'
    }
    this.openModal(this.templateRef)
  }

  setCurrentlySelected(searchQuery: string, isNodeSearch: boolean) {
    if (isNodeSearch) {
      var legalObject: LegalObject<LegalData> | null = this.legalService.getBuilder(searchQuery)
      if (legalObject) {
        this._currentlySelected = legalObject
      }
    } else {
      var legalLink: LegalObjectLink<LegalLinkData> | null = this.legalService.getLinkBuilder(searchQuery)
      if (legalLink) {
        this._currentlySelected = legalLink
      }
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  hideModal() {
    if (!this.modalRef) {
      throw Error('Could not hide the modal ref, because the modal ref is currently undefined')
    }
    this.modalRef.hide()
  }
  
}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GlobalSelectionService } from 'src/app/service/global-selection/global-selection.service';
import { DataModelService } from 'src/app/service/data/data-model.service';
import { LegalObjectNode, LegalNodeData, DirectedLegalObjectLink, LegalLinkData, LegalObjectLink } from 'src/app/service/legal-object/legal-object';
import { BsModalRef, BsModalService, TypeaheadMatch } from 'ngx-bootstrap';
import { BuildableByForm } from 'src/app/service/legal-object/buildable/buildable';
import { FormGroup } from '@angular/forms';
import { LegalObjectService } from 'src/app/service/legal-object/legal-object.service';

@Component({
  selector: 'app-visual-object-editor',
  templateUrl: './visual-object-editor.component.html',
  styleUrls: ['./visual-object-editor.component.css']
})
export class VisualObjectEditorComponent implements OnInit {

  @ViewChild('template') templateView: TemplateRef<any> 
  modalRef: BsModalRef

  typeaheadMinLength = 0
  typeaheadSingleWords = true
  typeaheadScrollable = true
  typeaheadOptionsInScrollableView = 5
  typeaheadHideResultsOnBlur = true
  typeaheadValues = this.legalService.knownLegalLinksString

  userSelectionBuffer: string
  
  modalTitle: string
  
  objectBuilder: BuildableByForm<LegalObjectLink<LegalLinkData>>
  objectBuilderForm: FormGroup

  constructor(
    public globalSelection: GlobalSelectionService,
    public dataModel: DataModelService,
    public legalService: LegalObjectService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {

  }

  onTypeAheadSelect(event: TypeaheadMatch) {
    this.modalTitle = event.value
    this.objectBuilder = this.legalService.getBuilder(event.value)
    this.objectBuilderForm = this.objectBuilder.formGroup
  }

  displayLinkBuilder(): boolean {
    return this.globalSelection.selected.length > 1
  }

  openModal() {
    this.modalRef = this.modalService.show(this.templateView);
  }

  onCancel() {
    this.modalRef.hide()
  }

  onDirectedSubmit() {
    this.modalRef.hide()

    const builtObject: DirectedLegalObjectLink<LegalLinkData> = this.objectBuilder.build()

    this.globalSelection.selected.forEach((sourceNode, i) => {
      builtObject.sourceNode = sourceNode 
      this.globalSelection.selected.forEach((destinationNode, j) => {
        if (i != j) {
          builtObject.destinationNode = destinationNode
          this.dataModel.addDirectedLegalLink(builtObject, 1)
        }
      })
    })
  }
}

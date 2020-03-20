import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DataModelService } from '../service/data-model.service';
import { GraphVisualsService } from '../service/graph-visuals.service';

@Component({
  selector: 'app-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements AfterViewInit { 
  
  @ViewChild('graph') divView: ElementRef
  
  constructor(
    public dataModelService: DataModelService, 
    public graphVisualService: GraphVisualsService
  ) { }

  ngAfterViewInit(): void {
    this.graphVisualService.draw(this.divView.nativeElement as HTMLElement)    
  }
}

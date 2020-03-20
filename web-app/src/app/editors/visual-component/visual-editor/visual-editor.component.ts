import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DataModelService } from 'src/app/service/data/data-model.service';
import { GraphVisualService } from 'src/app/service/graph/graph-visual.service';

@Component({
  selector: 'app-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements AfterViewInit { 
  
  @ViewChild('graph') divView: ElementRef
  
  constructor(
    public dataModelService: DataModelService, 
    public graphVisualService: GraphVisualService
  ) { }

  ngAfterViewInit(): void {
    this.graphVisualService.draw(this.divView.nativeElement as HTMLElement)    
  }
}

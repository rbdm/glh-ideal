import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DataModelService } from 'src/app/service/data/data-model.service';
import { GraphVisualService } from 'src/app/service/graph/graph-visual.service';

@Component({
  selector: 'app-visual-graph',
  templateUrl: './visual-graph.component.html',
  styleUrls: ['./visual-graph.component.css']
})
export class VisualGraphComponent implements AfterViewInit { 
  
  @ViewChild('graph') divView: ElementRef | undefined
  
  constructor(
    public dataModelService: DataModelService, 
    public graphVisualService: GraphVisualService
  ) { }

  ngAfterViewInit(): void {
    if (!this.divView) {
      throw Error('Could not select a template to draw the graph.')
    }
    this.graphVisualService.draw(this.divView.nativeElement as HTMLElement)    
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataModelService } from '../service/data-model.service';
import { GraphListenerEvent, GraphListenerEventKind } from '../service/graphs/graph-listener-event';


@Component({
  selector: 'app-object-builder',
  templateUrl: './object-builder.component.html',
  styleUrls: ['./object-builder.component.css']
})
export class ObjectBuilderComponent implements OnInit {

  @Output() eventListener: EventEmitter<GraphListenerEvent> = new EventEmitter()
  dataModelService: DataModelService


  constructor(dataModelService: DataModelService) {
    this.dataModelService = dataModelService
  }

  ngOnInit(): void {
  }

  addLegalObject(id: string, data: any) {
    this.dataModelService.addLegalObject(id, data)
  }
}

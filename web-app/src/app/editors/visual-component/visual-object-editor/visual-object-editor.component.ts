import { Component, OnInit } from '@angular/core';
import { GlobalSelectionService } from 'src/app/service/global-selection/global-selection.service';
import { Subscription } from 'rxjs';
import { GlobalSelectionEvent } from 'src/app/service/global-selection/global-selection-event';

@Component({
  selector: 'app-visual-object-editor',
  templateUrl: './visual-object-editor.component.html',
  styleUrls: ['./visual-object-editor.component.css']
})
export class VisualObjectEditorComponent implements OnInit {

  private globalSelectionServiceSubscription: Subscription

  constructor(public globalSelection: GlobalSelectionService) { }

  ngOnInit(): void {
    this.globalSelection
      .globalSelectionUpdateObservable
      .subscribe(this.globalSelectionSubscriptionEvent)
  }

  globalSelectionSubscriptionEvent = (event: GlobalSelectionEvent) => {
    this.ngOnInit()
  }

}

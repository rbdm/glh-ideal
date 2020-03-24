import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualGraphComponent } from './visual-graph.component';

describe('VisualGraphComponent', () => {
  let component: VisualGraphComponent;
  let fixture: ComponentFixture<VisualGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

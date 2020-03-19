import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedNodeComponent } from './selected-node.component';

describe('SelectedNodeComponent', () => {
  let component: SelectedNodeComponent;
  let fixture: ComponentFixture<SelectedNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

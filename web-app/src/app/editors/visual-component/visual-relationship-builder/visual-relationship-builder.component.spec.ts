import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualRelationshipBuilderComponent } from './visual-relationship-builder.component';

describe('VisualRelationshipBuilderComponent', () => {
  let component: VisualRelationshipBuilderComponent;
  let fixture: ComponentFixture<VisualRelationshipBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualRelationshipBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualRelationshipBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

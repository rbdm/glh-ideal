import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualRelationshipEditorComponent } from './visual-relationship-editor.component';

describe('VisualRelationshipEditorComponent', () => {
  let component: VisualRelationshipEditorComponent;
  let fixture: ComponentFixture<VisualRelationshipEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualRelationshipEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualRelationshipEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

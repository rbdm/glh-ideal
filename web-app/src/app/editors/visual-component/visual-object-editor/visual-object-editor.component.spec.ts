import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualObjectEditorComponent } from './visual-object-editor.component';

describe('VisualObjectEditorComponent', () => {
  let component: VisualObjectEditorComponent;
  let fixture: ComponentFixture<VisualObjectEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualObjectEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualObjectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

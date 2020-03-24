import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualEditorComponent } from './visual-editor.component';

describe('VisualObjectEditorComponent', () => {
  let component: VisualEditorComponent;
  let fixture: ComponentFixture<VisualEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

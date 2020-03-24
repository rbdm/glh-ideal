import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualBuilderComponent } from './visual-builder.component';

describe('VisualBuilderComponent', () => {
  let component: VisualBuilderComponent;
  let fixture: ComponentFixture<VisualBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

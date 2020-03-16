import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualDropInComponent } from './visual-drop-in.component';

describe('VisualDropInComponent', () => {
  let component: VisualDropInComponent;
  let fixture: ComponentFixture<VisualDropInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualDropInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualDropInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

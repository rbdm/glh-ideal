import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualObjectRemoverComponent } from './visual-object-remover.component';

describe('VisualObjectRemoverComponent', () => {
  let component: VisualObjectRemoverComponent;
  let fixture: ComponentFixture<VisualObjectRemoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualObjectRemoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualObjectRemoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

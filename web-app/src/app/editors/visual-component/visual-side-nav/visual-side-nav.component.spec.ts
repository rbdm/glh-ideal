import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualSideNavComponent } from './visual-side-nav.component';

describe('VisualSideNavComponent', () => {
  let component: VisualSideNavComponent;
  let fixture: ComponentFixture<VisualSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

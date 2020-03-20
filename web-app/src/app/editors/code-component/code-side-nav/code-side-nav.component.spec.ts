import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSideNavComponent } from './code-side-nav.component';

describe('CodeSideNavComponent', () => {
  let component: CodeSideNavComponent;
  let fixture: ComponentFixture<CodeSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

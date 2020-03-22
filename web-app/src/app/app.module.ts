import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BsDropdownModule, ModalModule, TypeaheadModule, } from 'ngx-bootstrap';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CodeSideNavComponent } from './editors/code-component/code-side-nav/code-side-nav.component'
import { CodeEditorComponent } from './editors/code-component/code-editor/code-editor.component'
import { VisualEditorComponent} from './editors/visual-component/visual-editor/visual-editor.component';
import { VisualSideNavComponent } from './editors/visual-component/visual-side-nav/visual-side-nav.component';
import { ObjectBuilderComponent } from './editors/visual-component/visual-object-builder/visual-object-builder.component';
import { VisualObjectEditorComponent } from './editors/visual-component/visual-object-editor/visual-object-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CodeSideNavComponent,
    CodeEditorComponent,
    VisualSideNavComponent,
    VisualEditorComponent,
    ObjectBuilderComponent,
    VisualObjectEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    ReactiveFormsModule,
    
    FormsModule,
    MatSidenavModule,
    DragDropModule,

    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

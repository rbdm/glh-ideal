import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule } from '@angular/material/icon';

import { BsDropdownModule, ModalModule, TypeaheadModule, } from 'ngx-bootstrap';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CodeSideNavComponent } from './editors/code-component/code-side-nav/code-side-nav.component'
import { CodeEditorComponent } from './editors/code-component/code-editor/code-editor.component'
import { VisualSideNavComponent } from './editors/visual-component/visual-side-nav/visual-side-nav.component';
import { VisualObjectRemoverComponent } from './editors/visual-component/visual-object-remover/visual-object-remover.component';
import { VisualBuilderComponent } from './editors/visual-component/visual-builder/visual-builder.component';
import { VisualGraphComponent } from './editors/visual-component/visual-graph/visual-graph.component';
import { VisualEditorComponent } from './editors/visual-component/visual-editor/visual-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CodeSideNavComponent,
    CodeEditorComponent,
    VisualSideNavComponent,
    VisualObjectRemoverComponent,
    VisualBuilderComponent,
    VisualGraphComponent,
    VisualEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    ReactiveFormsModule,
    
    FormsModule,
    MatSidenavModule,
    MatIconModule,

    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

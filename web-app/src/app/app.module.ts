import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav'; 
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BsDropdownModule, ModalModule, } from 'ngx-bootstrap';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CodeSideNavComponent } from './code-side-nav/code-side-nav.component';
import { CodeEditorComponent } from './code-side-nav/code-editor/code-editor.component';
import { VisualEditorComponent} from './visual-editor/visual-editor.component';
import { VisualSideNavComponent } from './visual-side-nav/visual-side-nav.component';
import { ObjectBuilderComponent } from './object-builder/object-builder.component';
import { ObjectEditorComponent } from './object-editor/object-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CodeSideNavComponent,
    CodeEditorComponent,
    VisualSideNavComponent,
    VisualEditorComponent,
    ObjectBuilderComponent,
    ObjectEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    FormsModule,
    MatSidenavModule,
    DragDropModule,

    BsDropdownModule.forRoot(),
    
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

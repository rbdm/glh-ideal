import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav'; 
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';


import { AlertModule, AccordionModule, BsDropdownModule, TabsModule } from 'ngx-bootstrap';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CodeSideNavComponent } from './code-side-nav/code-side-nav.component';
import { CodeEditorComponent } from './code-side-nav/code-editor/code-editor.component';
import { VisualEditorComponent} from './visual-side-nav/visual-editor/visual-editor.component';
import { VisualSideNavComponent } from './visual-side-nav/visual-side-nav.component';
import { VisualDropInComponent } from './visual-side-nav/visual-drop-in/visual-drop-in.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CodeSideNavComponent,
    CodeEditorComponent,
    VisualSideNavComponent,
    VisualEditorComponent,
    VisualDropInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    FormsModule,
    MatSidenavModule,
    DragDropModule,

    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

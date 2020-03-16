import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav'; 
import { FormsModule } from '@angular/forms';

import { AlertModule, BsDropdownModule } from 'ngx-bootstrap';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CodeSideNavComponent } from './code-side-nav/code-side-nav.component';
import { CodeEditorComponent } from './code-side-nav/code-editor/code-editor.component';
import { VisualEditorComponent} from './visual-side-nav/visual-editor/visual-editor.component';
import { VisualSideNavComponent } from './visual-side-nav/visual-side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CodeSideNavComponent,
    CodeEditorComponent,
    VisualSideNavComponent,
    VisualEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    FormsModule,
    MatSidenavModule,

    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

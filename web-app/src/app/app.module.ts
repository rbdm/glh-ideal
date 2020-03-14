import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav'; 

import { AlertModule, BsDropdownModule } from 'ngx-bootstrap';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SideNavComponent,
    CodeEditorComponent
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

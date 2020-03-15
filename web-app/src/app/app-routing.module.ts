import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { VisualEditorComponent } from './visual-editor/visual-editor.component';

const routes: Routes = [
  { path: 'code', component: CodeEditorComponent },
  { path: 'visual', component: VisualEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

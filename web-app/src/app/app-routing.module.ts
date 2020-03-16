import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualSideNavComponent } from './visual-side-nav/visual-side-nav.component';
import { CodeSideNavComponent } from './code-side-nav/code-side-nav.component';

const routes: Routes = [
  { path: 'code', component: CodeSideNavComponent },
  { path: 'visual', component: VisualSideNavComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeSideNavComponent } from './editors/code-component/code-side-nav/code-side-nav.component';
import { VisualSideNavComponent } from './editors/visual-component/visual-side-nav/visual-side-nav.component';

const routes: Routes = [
  { path: 'code', component: CodeSideNavComponent },
  { path: 'visual', component: VisualSideNavComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuponsComponent } from './pages/cupons/cupons.component';

const routes: Routes = [
  { path: '', component: CuponsComponent },
  { path: 'cupons', component: CuponsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

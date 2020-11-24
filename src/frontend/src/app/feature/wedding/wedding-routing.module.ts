import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CreateWeddingComponent } from './create-wedding/create-wedding.component';

const routes: Routes = [ {
  path: '',
  component: CreateWeddingComponent,
  canActivate: [AuthGuard],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeddingRoutingModule { }

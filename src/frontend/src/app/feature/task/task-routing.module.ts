import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MainTaskListComponent } from './main-task-list/main-task-list.component';
import { SubTaskListComponent } from './sub-task-list/sub-task-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainTaskListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: SubTaskListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}

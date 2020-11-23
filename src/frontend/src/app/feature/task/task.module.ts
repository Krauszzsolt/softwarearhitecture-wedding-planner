import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { MainTaskListComponent } from './main-task-list/main-task-list.component';
import { SubTaskListComponent } from './sub-task-list/sub-task-list.component';
import { AddMainTaskDialogComponent } from './add-main-task-dialog/add-main-task-dialog.component';
import { AddSubTaskDialogComponent } from './add-sub-task-dialog/add-sub-task-dialog.component';
import { DetailedSubTaskDialogComponent } from './detailed-sub-task-dialog/detailed-sub-task-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MainTaskListComponent, SubTaskListComponent, AddMainTaskDialogComponent, AddSubTaskDialogComponent, DetailedSubTaskDialogComponent],
  imports: [CommonModule, TaskRoutingModule, SharedModule],
})
export class TaskModule {}

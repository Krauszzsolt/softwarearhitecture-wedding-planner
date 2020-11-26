import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskGroupDto } from 'src/app/shared/client';
import { AddSubTaskDialogComponent } from '../add-sub-task-dialog/add-sub-task-dialog.component';
import { DetailedSubTaskDialogComponent } from '../detailed-sub-task-dialog/detailed-sub-task-dialog.component';
import { TaskManagementService } from '../service/task-management.service';

@Component({
  selector: 'app-sub-task-list',
  templateUrl: './sub-task-list.component.html',
  styleUrls: ['./sub-task-list.component.scss'],
})
export class SubTaskListComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router, private taskManagementSerice: TaskManagementService, private route: ActivatedRoute) {}
  public checked;
  public taskGroupDto: TaskGroupDto;
  public id = (this.route.snapshot.paramMap.get('id') as undefined) as number;
  ngOnInit() {
    this.taskManagementSerice.getTaskGroupDetail(this.id).subscribe((resp) => {
      this.taskGroupDto = resp;
    });
  }
  openSubTaskDialog() {
    const dialogRef = this.dialog.open(AddSubTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSubTaskDetailDialog(id) {
    const dialogRef = this.dialog.open(DetailedSubTaskDialogComponent, {
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.taskManagementSerice.getTaskGroupDetail(this.id).subscribe((resp) => {
        this.taskGroupDto = resp;
      });
    });
  }
}

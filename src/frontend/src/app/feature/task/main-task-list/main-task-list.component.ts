import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { WeddingDto } from 'src/app/shared/client';
import { AddMainTaskDialogComponent } from '../add-main-task-dialog/add-main-task-dialog.component';
import { TaskManagementService } from '../service/task-management.service';

@Component({
  selector: 'app-main-task-list',
  templateUrl: './main-task-list.component.html',
  styleUrls: ['./main-task-list.component.scss'],
})
export class MainTaskListComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router, private taskManagementSerice: TaskManagementService) { }
  public wedding: WeddingDto;
  ngOnInit() {
    this.taskManagementSerice.getTaskGroup().subscribe((x) => {
      this.wedding = x;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddMainTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.taskManagementSerice.getTaskGroup().subscribe((x) => {
        this.wedding = x;
      });
    });
  }

  mainTaskSelect(id: number) {
    if (this.wedding.taskGroups.filter(t => t.id == id)[0].canBeCompleted) {
      this.router.navigateByUrl(`task/${id}`);
    }
  }

  getRequiredTasks(id: number) {
    const ids = this.wedding.taskGroups.filter(t => t.id == id)[0].requiredTaskGroups;
    
    let ret = '';
    this.wedding.taskGroups.filter(t => ids.indexOf(t.id) != -1 && !t.completed).forEach(element => {
      ret += element.name + ', ';
    });
    ret = ret.substring(0, ret.length - 2);
    return ret;
  }

}

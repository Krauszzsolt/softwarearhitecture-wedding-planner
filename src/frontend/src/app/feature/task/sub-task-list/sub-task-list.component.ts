import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddSubTaskDialogComponent } from '../add-sub-task-dialog/add-sub-task-dialog.component';
import { DetailedSubTaskDialogComponent } from '../detailed-sub-task-dialog/detailed-sub-task-dialog.component';

@Component({
  selector: 'app-sub-task-list',
  templateUrl: './sub-task-list.component.html',
  styleUrls: ['./sub-task-list.component.scss']
})
export class SubTaskListComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }
  
  ngOnInit() {}
  openSubTaskDialog() {
    const dialogRef = this.dialog.open(AddSubTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSubTaskDetailDialog() {
    const dialogRef = this.dialog.open(DetailedSubTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  mainTaskSelect() {
    console.log('jeeh');
    this.router.navigateByUrl('task/1')
  }

}

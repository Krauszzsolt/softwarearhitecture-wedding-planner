import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddMainTaskDialogComponent } from '../add-main-task-dialog/add-main-task-dialog.component';

@Component({
  selector: 'app-main-task-list',
  templateUrl: './main-task-list.component.html',
  styleUrls: ['./main-task-list.component.scss'],
})
export class MainTaskListComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {}
  openDialog() {
    const dialogRef = this.dialog.open(AddMainTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  mainTaskSelect() {
    console.log('jeeh');
    this.router.navigateByUrl('task/1');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-sub-task-dialog',
  templateUrl: './detailed-sub-task-dialog.component.html',
  styleUrls: ['./detailed-sub-task-dialog.component.scss'],
})
export class DetailedSubTaskDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DetailedSubTaskDialogComponent>, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(): void {}
}

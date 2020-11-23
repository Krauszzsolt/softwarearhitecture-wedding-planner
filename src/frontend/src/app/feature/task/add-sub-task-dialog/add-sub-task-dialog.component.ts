import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sub-task-dialog',
  templateUrl: './add-sub-task-dialog.component.html',
  styleUrls: ['./add-sub-task-dialog.component.scss'],
})
export class AddSubTaskDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddSubTaskDialogComponent>,
    private formBuilder: FormBuilder,
    private router: Router // private tagsService: TagsService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-sub-task-dialog',
  templateUrl: './detailed-sub-task-dialog.component.html',
  styleUrls: ['./detailed-sub-task-dialog.component.scss'],
})
export class DetailedSubTaskDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DetailedSubTaskDialogComponent>, private formBuilder: FormBuilder, private router: Router) {}

  newStoryForm: FormGroup;
  loading = false;
  error = '';

  url: string | ArrayBuffer = 'https://localhost:44329/images/book-cover-placeholder.png';

  ngOnInit(): void {
    this.newStoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      desreption: [''],
    });
  }

  get f() {
    return this.newStoryForm.controls;
  }

  onFileChange(event) {}


  onSubmit(): void {
 
  }
}

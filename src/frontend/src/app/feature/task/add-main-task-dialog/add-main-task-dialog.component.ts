import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AddSubTaskDialogComponent } from '../add-sub-task-dialog/add-sub-task-dialog.component';

@Component({
  selector: 'app-add-main-task-dialog',
  templateUrl: './add-main-task-dialog.component.html',
  styleUrls: ['./add-main-task-dialog.component.scss'],
})
export class AddMainTaskDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddSubTaskDialogComponent>, private formBuilder: FormBuilder, private router: Router) {}

  newStoryForm: FormGroup;
  loading = false;
  error = '';

  url: string | ArrayBuffer = 'https://localhost:44329/images/book-cover-placeholder.png';

  ngOnInit(): void {
    this.newStoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      responsible: [''],
    });
  }

  get f() {
    return this.newStoryForm.controls;
  }

  onFileChange(event) {}

  deselect(selected: string): void {
    // const index: number = this.f.tags.value.indexOf(selected);
    // if (index > -1) {
    //   const newValue: string[] = this.f.tags.value.map((x) => x);
    //   newValue.splice(index, 1);
    //   this.f.tags.setValue(newValue);
    // }
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.newStoryForm.invalid) {
      return;
    }

    let tags: string[] = [];
    if (this.f.tags.value) {
      tags = this.f.tags.value.map((x) => x);
    }

    this.loading = true;
    // this.animationsService.animationsAddPost(this.f.title.value, this.f.coverImageSource.value).subscribe({
    //   next: () => {
    //     this.dialogRef.close();
    //   },
    //   error: (error) => {
    //     this.error = error;
    //     this.loading = false;
    //   },
    // });
  }
}

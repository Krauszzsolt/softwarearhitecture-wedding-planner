import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NewTaskDto, NewTaskGroupDto, WeddingDto } from 'src/app/shared/client';
import { TaskManagementService } from '../service/task-management.service';

@Component({
  selector: 'app-add-sub-task-dialog',
  templateUrl: './add-sub-task-dialog.component.html',
  styleUrls: ['./add-sub-task-dialog.component.scss'],
})
export class AddSubTaskDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddSubTaskDialogComponent>,
    private formBuilder: FormBuilder,
    private taskManagementSerice: TaskManagementService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
  }
  id : number;
  subTask: FormGroup;
  loading = false;
  error = '';
  newTaskDto: NewTaskDto;
  url: string | ArrayBuffer = 'https://localhost:44329/images/book-cover-placeholder.png';

  public wedding: WeddingDto;
  ngOnInit(): void {
    this.taskManagementSerice.getTaskGroup().subscribe((x) => {
      this.wedding = x;
    });
    this.subTask = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      responsible: [''],
    });
  }

  get f() {
    return this.subTask.controls;
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.subTask.invalid) {
      return;
    }

    this.newTaskDto = {
      name: this.f.name.value,
      responsible: this.f.responsible.value,
      description: this.f.description.value,
      taskGroupId: +this.id 
    };
    this.loading = true;
    this.taskManagementSerice.addTask(this.newTaskDto).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { NewTaskGroupDto, WeddingDto } from 'src/app/shared/client';
import { AddSubTaskDialogComponent } from '../add-sub-task-dialog/add-sub-task-dialog.component';
import { TaskManagementService } from '../service/task-management.service';

@Component({
  selector: 'app-add-main-task-dialog',
  templateUrl: './add-main-task-dialog.component.html',
  styleUrls: ['./add-main-task-dialog.component.scss'],
})
export class AddMainTaskDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddSubTaskDialogComponent>, private formBuilder: FormBuilder, private taskManagementSerice: TaskManagementService) {}

  taskGroup: FormGroup;
  loading = false;
  error = '';
  public wedding: WeddingDto;
  url: string | ArrayBuffer = 'https://localhost:44329/images/book-cover-placeholder.png';
  newTaskGroupDto: NewTaskGroupDto;

  ngOnInit(): void {
    this.taskManagementSerice.getTaskGroup().subscribe((x) => {
      this.wedding = x;
    });

    this.taskGroup = this.formBuilder.group({
      task: ['', Validators.required],
      requiredTasks: [''],
    });
  }

  get f() {
    return this.taskGroup.controls;
  }

  onFileChange(event) {}

  onSubmit(): void {
    if (this.taskGroup.invalid) {
      return;
    }

    this.newTaskGroupDto = {
      name: this.f.task.value,
      requiredTaskGroups: this.f.requiredTasks.value,
    };
    this.loading = true;
    this.taskManagementSerice.addTaskGroup(this.newTaskGroupDto).subscribe({
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

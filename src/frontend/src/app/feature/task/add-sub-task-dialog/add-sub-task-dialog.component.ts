import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NewTaskDto, NewTaskGroupDto, WeddingDto } from 'src/app/shared/client';
import { TaskManagementService } from '../service/task-management.service';

@Component({
  selector: 'app-add-sub-task-dialog',
  templateUrl: './add-sub-task-dialog.component.html',
  styleUrls: ['./add-sub-task-dialog.component.scss'],
})
export class AddSubTaskDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddSubTaskDialogComponent>, private formBuilder: FormBuilder, private taskManagementSerice: TaskManagementService, private route: ActivatedRoute) {}

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
      title: ['', Validators.required],
      desreption: [''],
      requiredTasks: [''],
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
      name: this.f.task.value,
      responsible: this.f.requiredTasks.value,
      description: this.f.desreption.value,
      taskGroupId: this.route.snapshot.paramMap.get('id') as undefined as number

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

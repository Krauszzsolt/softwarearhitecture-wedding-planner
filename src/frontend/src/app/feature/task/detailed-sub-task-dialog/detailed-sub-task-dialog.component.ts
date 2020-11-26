import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { NewCommentDto, TaskDto } from 'src/app/shared/client';
import { TaskManagementService } from '../service/task-management.service';

@Component({
  selector: 'app-detailed-sub-task-dialog',
  templateUrl: './detailed-sub-task-dialog.component.html',
  styleUrls: ['./detailed-sub-task-dialog.component.scss'],
})
export class DetailedSubTaskDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailedSubTaskDialogComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private taskManagementSerice: TaskManagementService,
    private userService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
  }

  commentForm: FormGroup;
  loading = false;
  error = '';
  taskDto: TaskDto;
  url: string | ArrayBuffer = 'https://localhost:44329/images/book-cover-placeholder.png';
  newCommentDto: NewCommentDto;
  id;
  ngOnInit(): void {
    this.taskManagementSerice.getTaskDetail(this.id).subscribe((resp) => {
      this.taskDto = resp;
    });
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  get f() {
    return this.commentForm.controls;
  }

  onFileChange(event) {}

  onSubmit(): void {
    this.newCommentDto = {
      author: this.userService.currentUserValue.userName,
      content: this.f.comment.value,
    };
    this.taskManagementSerice.addTaskComment(this.id, this.newCommentDto).subscribe(() => {
      this.taskManagementSerice.getTaskDetail(this.id).subscribe((resp) => {
        this.taskDto = resp;
      });
    });
  }

  delete() {
    this.taskManagementSerice.deleteTask(this.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
  complete() {
    this.taskManagementSerice.completeTask(this.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
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
    private route: ActivatedRoute,
    private userService: AuthService
  ) {}

  commentForm: FormGroup;
  loading = false;
  error = '';
  taskDto: TaskDto;
  url: string | ArrayBuffer = 'https://localhost:44329/images/book-cover-placeholder.png';
  newCommentDto: NewCommentDto;
  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id') as undefined) as number;
    this.taskManagementSerice.getTaskDetail(id).subscribe((resp) => {
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
    const id = (this.route.snapshot.paramMap.get('id') as undefined) as number;
    this.newCommentDto = {
      author: this.userService.currentUserValue.userName,
      content: this.f.comment.value,
    };
    this.taskManagementSerice.addTaskComment(id, this.newCommentDto).subscribe(() => {});
  }

  delete() {
    const id = (this.route.snapshot.paramMap.get('id') as undefined) as number;
    this.taskManagementSerice.deleteTask(id).subscribe(() => {
      this.dialogRef.close();
    });
  }
  complete() {
    const id = (this.route.snapshot.paramMap.get('id') as undefined) as number;
    this.taskManagementSerice.completeTask(id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}

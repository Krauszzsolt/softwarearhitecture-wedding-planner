import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, shareReplay } from 'rxjs/operators';
import { CommentDto, NewCommentDto, NewTaskDto, NewTaskGroupDto, TaskDto, TaskGroupDto, TaskGroupService, TaskService, WeddingDto, WeddingService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class TaskManagementService {
  constructor(private taskService: TaskService, private taskGroupService: TaskGroupService, private weddingService: WeddingService) {
    this.searchTrem = new BehaviorSubject<string>('');
  }

  private searchTrem: BehaviorSubject<string>;

  public setSearchTerm(searchTrem) {
    this.searchTrem.next(searchTrem);
  }

  public getSearchTerm(): Observable<string> {
    return this.searchTrem.asObservable().pipe(debounceTime(500));
  }

  public getTaskGroup(): Observable<WeddingDto> {
    const id = JSON.parse(localStorage.getItem('currentUser')).weddingId;    
    return this.weddingService.weddingIdGet(id).pipe(shareReplay(1));
  }

  public getTaskGroupDetail(id: number): Observable<TaskGroupDto> {
    return this.taskGroupService.taskGroupIdGet(id).pipe(shareReplay(1));
  }

  public addTaskGroup(newTaskGroupDto: NewTaskGroupDto): Observable<TaskGroupDto> {
    return this.taskGroupService.taskGroupAddPost(newTaskGroupDto).pipe();
  }

  public deleteTaskGroup(id: number): Observable<TaskGroupDto> {
    return this.taskGroupService.taskGroupIdDeletePost(id).pipe();
  }

  public getTaskDetail(id: number): Observable<TaskDto> {
    return this.taskService.taskIdGet(id).pipe(shareReplay(1));
  }

  public addTask(newTaskDto: NewTaskDto): Observable<TaskDto> {
    return this.taskService.taskAddPost(newTaskDto).pipe();
  }

  public addTaskComment(id: number, newCommentDto: NewCommentDto): Observable<CommentDto> {
    return this.taskService.taskIdCommentPost(id, newCommentDto).pipe();
  }

  public completeTask(id: number): Observable<TaskDto> {
    return this.taskService.taskIdCompletePost(id).pipe();
  }

  public deleteTask(id: number): Observable<any> {
    return this.taskService.taskIdDeletePost(id).pipe();
  }
}

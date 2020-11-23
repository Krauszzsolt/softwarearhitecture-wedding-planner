import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyTaskService } from 'src/app/feature/task/service/my-task.service';
import { ApplicationUserDto } from 'src/app/shared/client';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService, private taskService: MyTaskService) {}
  public user: Observable<ApplicationUserDto> = new Observable();
  public showFiller = false;
  public search = '';
  ngOnInit() {
    this.user = this.authService.getUser();
  }

  public searchEvetn() {
    this.taskService.setSearchTerm(this.search);
  }

  public logout() {
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskManagementService } from 'src/app/feature/task/service/task-management.service';
import { ApplicationUserDto } from 'src/app/shared/client';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService, private taskManagementService: TaskManagementService) {}
  public user: Observable<ApplicationUserDto> = new Observable();
  public showFiller = false;
  public search = '';
  ngOnInit() {
    this.user = this.authService.getUser();
  }

  public searchEvetn() {
    this.taskManagementService.setSearchTerm(this.search);
  }

  public logout() {
    this.authService.logout();
  }
}

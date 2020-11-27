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
  public currentBethrothedSubject: [{ name: string; isActive: boolean }, { name: string; isActive: boolean }];
  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.getBethrothed().subscribe((x) => {
      this.currentBethrothedSubject = x;
    });
  }

  public searchEvetn() {
    this.taskManagementService.setSearchTerm(this.search);
  }

  public logout() {
    this.authService.logout();
  }

  public setBethrothed(i: number) {
    this.authService.setBethrothed(i);
  }
}

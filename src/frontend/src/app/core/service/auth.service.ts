import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TaskManagementService } from 'src/app/feature/task/service/task-management.service';
import { ApplicationUserDto, LoginDto, RegisterDto, UsersService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<ApplicationUserDto>;
  private currentBethrothedSubject: BehaviorSubject<[{ name: string; isActive: boolean }, { name: string; isActive: boolean }]>;

  constructor(private usersService: UsersService, private router: Router, private taskManagementService: TaskManagementService) {
    this.currentUserSubject = new BehaviorSubject<ApplicationUserDto>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentBethrothedSubject = new BehaviorSubject<[{ name: string; isActive: boolean }, { name: string; isActive: boolean }]>(
      JSON.parse(localStorage.getItem('currentBethrothed'))
    );
    console.log(JSON.parse(localStorage.getItem('currentBethrothed')));
    if (!JSON.parse(localStorage.getItem('currentBethrothed'))) {
      console.log('hehjehjehjehejj');
      this.currentBethrothedSubject.next([
        {
          name: '',
          isActive: false,
        },
        {
          name: '',
          isActive: false,
        },
      ]);
    }
    localStorage.setItem('currentBethrothed', JSON.stringify(this.currentBethrothedSubject.value));
    // this.setCurrentBethrothedSubject();
  }

  public setCurrentBethrothedSubject() {
    this.updateBethrothed();
    if (
      this.currentUserSubject.value &&
      this.currentUserSubject.value.weddingId &&
      !this.currentBethrothedSubject.value[0].isActive &&
      !this.currentBethrothedSubject.value[1].isActive
    ) {
      this.taskManagementService.getTaskGroup().subscribe((x) => {
        this.currentBethrothedSubject.next([
          {
            name: x.bethrothedOne,
            isActive: false,
          },
          {
            name: x.bethrothedTwo,
            isActive: false,
          },
        ]);
        localStorage.setItem('currentBethrothed', JSON.stringify(this.currentBethrothedSubject.value));
      });
    }
  }
  public get currentBethrothedValue(): [{ name: string; isActive: boolean }, { name: string; isActive: boolean }] {
    return this.currentBethrothedSubject.value;
  }

  public updateBethrothed() {
    if (JSON.parse(localStorage.getItem('currentBethrothed'))) {
      this.currentBethrothedSubject.next(JSON.parse(localStorage.getItem('currentBethrothed')));
    }
  }

  public getBethrothed(): Observable<[{ name: string; isActive: boolean }, { name: string; isActive: boolean }]> {
    return this.currentBethrothedSubject.asObservable();
  }

  public getActiveBethrothedName(): string {
    return this.currentBethrothedSubject.value.reduce((a, o) => (o.isActive && a.push(o.name), a), [])[0];
  }

  public get currentUserValue(): ApplicationUserDto {
    return this.currentUserSubject.value;
  }

  public updateUser() {
    this.currentUserSubject.next(JSON.parse(localStorage.getItem('currentUser')));
  }

  public getUser(): Observable<ApplicationUserDto> {
    return this.currentUserSubject.asObservable();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public login(loginDto: LoginDto): Observable<ApplicationUserDto> {
    return this.usersService.usersAuthenticatePost(loginDto).pipe(
      tap((x) => {
        localStorage.setItem('token', x.token);
        localStorage.setItem('currentUser', JSON.stringify(x));
        this.currentUserSubject.next(x);
      })
    );
  }

  public register(registerDto: RegisterDto): Observable<any> {
    return this.usersService.usersRegisterPost(registerDto).pipe(
      tap((x) => {
        localStorage.setItem('token', x.token);
        localStorage.setItem('currentUser', JSON.stringify(x));
        this.currentUserSubject.next(x);
      })
    );
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');

    localStorage.removeItem('currentBethrothed');
    this.currentUserSubject.next(undefined);
    this.router.navigateByUrl('login');
    this.currentBethrothedSubject.next([
      {
        name: '',
        isActive: false,
      },
      {
        name: '',
        isActive: false,
      },
    ]);
  }
}

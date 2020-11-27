import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { WeddingGuard } from './guards/wedding.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'task',
        loadChildren: () => import('./../feature/task/task.module').then((m) => m.TaskModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'guest',
        loadChildren: () => import('./../feature/guest/guest.module').then((m) => m.GuestModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'pictures',
        loadChildren: () => import('./../feature/picture/picture.module').then((m) => m.PictureModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'wedding',
        loadChildren: () => import('./../feature/wedding/wedding.module').then((m) => m.WeddingModule),
        canActivate: [WeddingGuard],
      },
      {
        path: 'upload',
        loadChildren: () => import('./../feature/picture-upload/picture-upload.module').then((m) => m.PictureUploadModule),
        canActivate: [WeddingGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: '',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}

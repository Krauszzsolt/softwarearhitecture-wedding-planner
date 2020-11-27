import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PictureUploadComponent } from './picture-upload/picture-upload.component';

const routes: Routes = [  {
  path: ':id',
  component: PictureUploadComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PictureUploadRoutingModule { }

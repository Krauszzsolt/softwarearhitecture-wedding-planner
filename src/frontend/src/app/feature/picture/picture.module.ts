import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureRoutingModule } from './picture-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PictureListComponent } from './picture-list/picture-list.component';

@NgModule({
  declarations: [PictureListComponent],
  imports: [
    CommonModule,
    PictureRoutingModule,
    SharedModule
  ]
})
export class PictureModule { }

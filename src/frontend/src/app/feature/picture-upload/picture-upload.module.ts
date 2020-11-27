import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PictureUploadRoutingModule } from './picture-upload-routing.module';
import { PictureUploadComponent } from './picture-upload/picture-upload.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PictureUploadComponent],
  imports: [
    CommonModule,
    PictureUploadRoutingModule,
    SharedModule
  ]
})
export class PictureUploadModule { }

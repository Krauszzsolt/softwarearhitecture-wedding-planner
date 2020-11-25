import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestInviteComponent } from './guest-invite/guest-invite.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GuestInviteComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule
  ]
})
export class GuestModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestInviteComponent } from './guest-invite/guest-invite.component';

@NgModule({
  declarations: [GuestInviteComponent],
  imports: [
    CommonModule,
    GuestRoutingModule
  ]
})
export class GuestModule { }

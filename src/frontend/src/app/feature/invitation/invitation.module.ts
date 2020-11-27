import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationRoutingModule } from './invitation-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AcceptInvitationComponent } from './accept-invitation/accept-invitation.component';

@NgModule({
  declarations: [AcceptInvitationComponent],
  imports: [
    CommonModule,
    InvitationRoutingModule,
    SharedModule
  ]
})
export class InvitationModule { }

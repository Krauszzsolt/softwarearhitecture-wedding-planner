import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationRoutingModule } from './invitation-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AcceptInvitationComponent } from './accept-invitation/accept-invitation.component';
import { InvitationComponent } from './invitation/invitation.component';

@NgModule({
  declarations: [AcceptInvitationComponent, InvitationComponent],
  imports: [
    CommonModule,
    InvitationRoutingModule,
    SharedModule
  ]
})
export class InvitationModule { }

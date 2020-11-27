import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptInvitationComponent } from './accept-invitation/accept-invitation.component';

const routes: Routes = [
  {
    path: ':guestId',
    component: AcceptInvitationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationRoutingModule {}

import { Injectable } from '@angular/core';
import { GuestService, InviteDto, WeddingService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class GuestManagementService {
  constructor(private guestService: GuestService, private weddingService: WeddingService) {}

  public inviteGuest(inviteDto?: InviteDto) {
    const id = JSON.parse(localStorage.getItem('currentUser')).weddingId;
    return this.weddingService.weddingIdInvitePost(id, inviteDto);
  }

  public getInvitedGuest() {
    const id = JSON.parse(localStorage.getItem('currentUser')).weddingId;
    return this.weddingService.weddingIdInvitedGet(id);
  }
}

import { Injectable } from '@angular/core';
import { GuestService, InviteDto, WeddingService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class GuestManagementService {
  constructor(private guestService: GuestService, private weddingService: WeddingService) {}

  public inviteGuest(inviteDto?: InviteDto) {
    // id = JSON.parse(localStorage.getItem('user')).weddingId;
    const id = 1;
    return this.weddingService.weddingIdInvitePost(id, inviteDto);
  }

  public getInvitedGuest() {
    // id = JSON.parse(localStorage.getItem('user')).weddingId;
    const id = 1;
    return this.weddingService.weddingIdInvitedGet(id);
  }
}

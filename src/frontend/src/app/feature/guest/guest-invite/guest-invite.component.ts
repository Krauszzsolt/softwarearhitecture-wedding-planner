import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { GuestDto, InviteDto, NewGuestDto } from 'src/app/shared/client';
import { GuestManagementService } from '../service/gust-management.service';

@Component({
  selector: 'app-guest-invite',
  templateUrl: './guest-invite.component.html',
  styleUrls: ['./guest-invite.component.scss'],
})
export class GuestInviteComponent implements OnInit {
  public loading = false;
  public error = '';
  constructor(public dialog: MatDialog, private guestManagerService: GuestManagementService, private authService: AuthService) {}
  public guestList = new FormArray([]);
  public guests: GuestDto[];
  public inviteDto: InviteDto;
  public newGuestDto?: NewGuestDto[];
  public emailContent: string;
  ngOnInit() {
    this.guestManagerService.getInvitedGuest().subscribe((resp) => {
      this.guests = resp;
    });
    this.addGuest();
    this.authService.setCurrentBethrothedSubject();
  }

  addGuest() {
    const group = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });

    this.guestList.push(group);
  }

  get f() {
    return this.guestList.controls as FormGroup[];
  }

  delete(index) {
    this.guestList.removeAt(index);
  }

  invite() {
    this.newGuestDto = this.f.map((x) => ({ name: x.controls.name.value, email: x.controls.email.value } as NewGuestDto));
    this.inviteDto = {
      guests: this.newGuestDto,
      invitationText: this.emailContent,
    };
    this.guestManagerService.inviteGuest(this.inviteDto).subscribe((resp) => {});
  }
}

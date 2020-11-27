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

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private guestManagerService: GuestManagementService,
    private authService: AuthService
  ) {}

  public guestForms = new FormArray([]);
  public currentGuests: GuestDto[];
  public inviteDto: InviteDto;
  public emailContent: string;

  ngOnInit() {
    this.guestManagerService.getInvitedGuest().subscribe((resp) => {
      this.currentGuests = resp;
    });
    this.addGuest();
    this.authService.setCurrentBethrothedSubject();
  }

  addGuest() {
    const form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });

    this.guestForms.push(form);
  }

  get f() {
    return this.guestForms.controls as FormGroup[];
  }

  delete(index: number) {
    this.guestForms.removeAt(index);
  }

  invite() {
    const newGuests = this.f.map((x) => ({ name: x.controls.name.value, email: x.controls.email.value } as NewGuestDto));
    this.inviteDto = {
      guests: newGuests,
      invitationText: this.emailContent,
    };

    this.guestManagerService.inviteGuest(this.inviteDto).subscribe((resp) => {
      this.guestForms = new FormArray([]);
      newGuests
        .map((x) => ({ email: x.email, name: x.name, acceptedInvitation: false } as GuestDto))
        .forEach((element) => {
          this.currentGuests.push(element);
        });
      this.addGuest();
    });
  }
}

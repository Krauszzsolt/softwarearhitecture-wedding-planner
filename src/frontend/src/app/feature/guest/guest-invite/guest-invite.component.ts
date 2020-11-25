import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { GuestDto } from 'src/app/shared/client';
import { GuestManagementService } from '../service/gust-management.service';

@Component({
  selector: 'app-guest-invite',
  templateUrl: './guest-invite.component.html',
  styleUrls: ['./guest-invite.component.scss'],
})
export class GuestInviteComponent implements OnInit {
  public loading = false;
  public error = '';
  constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder, private guestManagerService: GuestManagementService) {}
  public guestList = new FormArray([]);
  public guests: GuestDto[];
  ngOnInit() {
    this.guestManagerService.getInvitedGuest().subscribe((resp) => {
      this.guests = resp;
    });
    this.addGuest();
    this.addGuest();
    this.addGuest();
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

  mainTaskSelect() {
    console.log('jeeh');
    // this.router.navigateByUrl('task/1')
  }
}

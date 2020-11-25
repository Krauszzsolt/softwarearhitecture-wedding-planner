import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-invite',
  templateUrl: './guest-invite.component.html',
  styleUrls: ['./guest-invite.component.scss'],
})
export class GuestInviteComponent implements OnInit {
  public loading = false;
  public error = '';
  constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder) {}
  public guestList = new FormArray([]);

  ngOnInit() {
    this.addGuest();
    this.addGuest();
    this.addGuest();
    this.addGuest();
    this.f;
  }

  addGuest() {
    const group = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });

    this.guestList.push(group);
  }

  get f() {
    console.log(this.guestList.controls);
    console.log(this.guestList);
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

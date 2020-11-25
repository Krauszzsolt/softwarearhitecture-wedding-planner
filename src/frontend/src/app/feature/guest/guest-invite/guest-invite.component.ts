import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-invite',
  templateUrl: './guest-invite.component.html',
  styleUrls: ['./guest-invite.component.scss']
})
export class GuestInviteComponent implements OnInit {

  public guestList: FormGroup;
  public loading = false;
  public error = '';
  constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.guestList = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  get f() {
    return this.guestList.controls;
  }


  mainTaskSelect() {
    console.log('jeeh');
    // this.router.navigateByUrl('task/1')
  }

}

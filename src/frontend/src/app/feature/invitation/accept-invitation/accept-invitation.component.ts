import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from 'src/app/shared/client';

@Component({
  selector: 'app-accept-invitation',
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.scss']
})
export class AcceptInvitationComponent implements OnInit {

  guestId = (this.route.snapshot.paramMap.get('guestId') as undefined) as number;

  constructor(private route: ActivatedRoute, private router: Router, private guestService: GuestService) { }

  ngOnInit() {
  }

  accept() {
    this.guestService.guestIdAcceptPost(this.guestId).subscribe(result => {
      this.router.navigate(['invitation']);
    });
  }

  decline () {
    this.guestService.guestIdDeclinePost(this.guestId).subscribe(result => {
      this.router.navigate(['invitation']);
    });
  }

}

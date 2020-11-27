import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accept-invitation',
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.scss']
})
export class AcceptInvitationComponent implements OnInit {

  guestId = (this.route.snapshot.paramMap.get('guestId') as undefined) as number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}

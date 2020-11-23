import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestInviteComponent } from './guest-invite.component';

describe('GuestInviteComponent', () => {
  let component: GuestInviteComponent;
  let fixture: ComponentFixture<GuestInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

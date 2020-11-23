import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMainTaskDialogComponent } from './add-main-task-dialog.component';

describe('AddMainTaskDialogComponent', () => {
  let component: AddMainTaskDialogComponent;
  let fixture: ComponentFixture<AddMainTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMainTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMainTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

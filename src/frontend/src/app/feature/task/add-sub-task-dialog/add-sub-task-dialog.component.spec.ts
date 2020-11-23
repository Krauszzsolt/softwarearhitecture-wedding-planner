import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubTaskDialogComponent } from './add-sub-task-dialog.component';

describe('AddSubTaskDialogComponent', () => {
  let component: AddSubTaskDialogComponent;
  let fixture: ComponentFixture<AddSubTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

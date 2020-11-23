import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSubTaskDialogComponent } from './detailed-sub-task-dialog.component';

describe('DetailedSubTaskDialogComponent', () => {
  let component: DetailedSubTaskDialogComponent;
  let fixture: ComponentFixture<DetailedSubTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedSubTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSubTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

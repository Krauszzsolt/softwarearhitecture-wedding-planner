import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWeddingComponent } from './create-wedding.component';

describe('CreateWeddingComponent', () => {
  let component: CreateWeddingComponent;
  let fixture: ComponentFixture<CreateWeddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWeddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

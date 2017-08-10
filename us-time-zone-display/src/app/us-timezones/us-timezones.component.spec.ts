import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsTimezonesComponent } from './us-timezones.component';

describe('UsTimezonesComponent', () => {
  let component: UsTimezonesComponent;
  let fixture: ComponentFixture<UsTimezonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsTimezonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsTimezonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAdoptedComponent } from './recently-adopted.component';

describe('RecentlyAdoptedComponent', () => {
  let component: RecentlyAdoptedComponent;
  let fixture: ComponentFixture<RecentlyAdoptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyAdoptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyAdoptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

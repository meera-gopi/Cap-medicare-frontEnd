import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustSignUpComponent } from './cust-sign-up.component';

describe('CustSignUpComponent', () => {
  let component: CustSignUpComponent;
  let fixture: ComponentFixture<CustSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

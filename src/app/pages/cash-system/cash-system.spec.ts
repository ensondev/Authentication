import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSystem } from './cash-system';

describe('CashSystem', () => {
  let component: CashSystem;
  let fixture: ComponentFixture<CashSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashSystem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRegisterProduct } from './inventory-register-product';

describe('InventoryRegisterProduct', () => {
  let component: InventoryRegisterProduct;
  let fixture: ComponentFixture<InventoryRegisterProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryRegisterProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryRegisterProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

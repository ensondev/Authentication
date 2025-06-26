import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySaleProduct } from './inventory-sale-product';

describe('InventorySaleProduct', () => {
  let component: InventorySaleProduct;
  let fixture: ComponentFixture<InventorySaleProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventorySaleProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorySaleProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

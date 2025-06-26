import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryInsertProduct } from './inventory-insert-product';

describe('InventoryInsertProduct', () => {
  let component: InventoryInsertProduct;
  let fixture: ComponentFixture<InventoryInsertProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryInsertProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryInsertProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

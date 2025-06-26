import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseInventory } from './warehouse-inventory';

describe('WarehouseInventory', () => {
  let component: WarehouseInventory;
  let fixture: ComponentFixture<WarehouseInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseInventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

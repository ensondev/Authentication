import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Donates } from './donates';

describe('Donates', () => {
  let component: Donates;
  let fixture: ComponentFixture<Donates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Donates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Donates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsPage } from './cart-items.page';

describe('CartItemsPage', () => {
  let component: CartItemsPage;
  let fixture: ComponentFixture<CartItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compra03Component } from './compra03.component';

describe('Compra03Component', () => {
  let component: Compra03Component;
  let fixture: ComponentFixture<Compra03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compra03Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Compra03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

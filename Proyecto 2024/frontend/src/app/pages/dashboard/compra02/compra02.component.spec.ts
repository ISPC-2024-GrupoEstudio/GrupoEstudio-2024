import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compra02Component } from './compra02.component';

describe('Compra02Component', () => {
  let component: Compra02Component;
  let fixture: ComponentFixture<Compra02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compra02Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Compra02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compra01Component } from './compra01.component';

describe('Compra01Component', () => {
  let component: Compra01Component;
  let fixture: ComponentFixture<Compra01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compra01Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Compra01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

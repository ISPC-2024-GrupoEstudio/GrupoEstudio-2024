import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroProductosComponent } from './filtro-productos.component';

describe('FiltroProductosComponent', () => {
  let component: FiltroProductosComponent;
  let fixture: ComponentFixture<FiltroProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

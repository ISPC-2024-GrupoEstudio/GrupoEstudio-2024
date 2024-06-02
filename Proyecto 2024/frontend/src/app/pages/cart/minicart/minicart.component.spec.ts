import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinicartComponent } from './minicart.component';

describe('MinicartComponent', () => {
  let component: MinicartComponent;
  let fixture: ComponentFixture<MinicartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinicartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinicartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

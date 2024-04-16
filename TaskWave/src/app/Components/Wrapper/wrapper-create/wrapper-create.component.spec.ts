import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperCreateComponent } from './wrapper-create.component';

describe('WrapperCreateComponent', () => {
  let component: WrapperCreateComponent;
  let fixture: ComponentFixture<WrapperCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapperCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrapperCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperListComponent } from './wrapper-list.component';

describe('WrapperListComponent', () => {
  let component: WrapperListComponent;
  let fixture: ComponentFixture<WrapperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapperListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrapperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

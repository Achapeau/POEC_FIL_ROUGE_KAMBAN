import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateProjectComponent } from './modal-update-project.component';

describe('ModalUpdateProjectComponent', () => {
  let component: ModalUpdateProjectComponent;
  let fixture: ComponentFixture<ModalUpdateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

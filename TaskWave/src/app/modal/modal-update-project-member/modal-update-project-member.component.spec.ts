import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateProjectMemberComponent } from './modal-update-project-member.component';

describe('ModalUpdateProjectMemberComponent', () => {
  let component: ModalUpdateProjectMemberComponent;
  let fixture: ComponentFixture<ModalUpdateProjectMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateProjectMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateProjectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

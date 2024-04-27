import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icon, User } from '../../Model/model';
import { UserService } from '../../Service/user.service';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';

@Component({
  selector: 'app-modal-update-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-update-user.component.html',
  styleUrl: './modal-update-user.component.css'
})
export class ModalUpdateUserComponent {
  constructor(public fb: FormBuilder, private userService: UserService, private sidebarService: SidebarComponent) { }
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  iconsList: Icon[] = [
    {
      lien: 'icone-admin.svg',
    },
    {
      lien: 'icone-admin2.svg',
    },
    {
      lien: 'icone-admin3.svg',
    },
    {
      lien: 'icone-admin4.svg',
    },
    {
      lien: 'icone-admin5.svg',
    },
    {
      lien: 'icone-admin6.svg',
    }
  ];
  
  public checkoutForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    icon: ['', [Validators.required]],
  });
  
  ngOnChanges(): void {
    this.checkoutForm.reset({
      firstname: this.userService.currentUser?.firstname,
      lastname: this.userService.currentUser?.lastname,
      icon: this.userService.currentUser?.icon,
    });
  }
  onSubmit() {
    if (this.checkoutForm.valid) {

      let newUser: Partial<User> = {
        id: this.userService.currentUser?.id,
        firstname: this.checkoutForm.value.firstname as string,
        lastname: this.checkoutForm.value.lastname as string,
        icon: this.checkoutForm.value.icon as string,
      };
      this.userService.updateUser(newUser).subscribe((user) => {
        console.log('Utilisateur mis a jour');
        console.log(user);
        this.userService.currentUser = user;
      })
      this.closeModal();
    } else {
      alert('Formulaire invalide');
    }
  }

  openModal(): void {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen); 
  }

}

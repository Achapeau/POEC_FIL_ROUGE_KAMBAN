import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ModalComponent {
  @Input() isOpen = true;
  @Output() isOpenChange = new EventEmitter<boolean>(); // Ajout pour le two-way binding

  onClose() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen); // Notifier le changement
  }
}

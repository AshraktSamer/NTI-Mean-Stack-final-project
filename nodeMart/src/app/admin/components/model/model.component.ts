import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-model',
  imports: [],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss'
})
export class ModelComponent {
  @Input() isOpen = false;
  @Output() closeModel = new EventEmitter();

  onCloseModel() {
    this.closeModel.emit(false);
  }


}

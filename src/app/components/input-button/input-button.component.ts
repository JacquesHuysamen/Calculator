import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InputButtonConfiguration} from "../../models/input-button-configuration";
import {NgIf} from "@angular/common";
import {ActionsEnum} from "../../models/actions.enum";

@Component({
  selector: 'app-input-button',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './input-button.component.html',
  styleUrl: './input-button.component.scss'
})
export class InputButtonComponent {
  @Input()
  buttonConfig: InputButtonConfiguration | undefined = undefined;


  @Output()
  buttonPressed = new EventEmitter<InputButtonConfiguration>();


  onClick(){
    if (!this.buttonConfig) return;
    this.buttonPressed.next(this.buttonConfig);
  }
}

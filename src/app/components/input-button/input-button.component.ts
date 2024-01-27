import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InputButtonConfiguration} from "../../models/input-button-configuration";
import {NgClass, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-input-button',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatButton
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

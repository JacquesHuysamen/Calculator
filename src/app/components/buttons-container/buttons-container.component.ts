import {Component, EventEmitter, Output} from '@angular/core';
import {InputButtonComponent} from "../input-button/input-button.component";
import {InputButtonConfiguration} from "../../models/input-button-configuration";
import {NgForOf} from "@angular/common";
import {ActionsEnum} from "../../models/actions.enum";

@Component({
  selector: 'app-buttons-container',
  standalone: true,
  imports: [
    InputButtonComponent,
    NgForOf
  ],
  templateUrl: './buttons-container.component.html',
  styleUrl: './buttons-container.component.scss'
})
export class ButtonsContainerComponent {
  @Output()
  buttonPressed = new EventEmitter<InputButtonConfiguration>();

  buttonsConfig: InputButtonConfiguration[] = [];

  constructor() {
    this.setupButtonsConfig();
  }

  private setupButtonsConfig(): void {
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.showCalcs, true))
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.ac, true))
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.ac, true))
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.ac, true))

    this.buttonsConfig.push(this.createNormalButtonConfig(7));
    this.buttonsConfig.push(this.createNormalButtonConfig(8));
    this.buttonsConfig.push(this.createNormalButtonConfig(9));
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.plus, false))

    this.buttonsConfig.push(this.createNormalButtonConfig(4));
    this.buttonsConfig.push(this.createNormalButtonConfig(5));
    this.buttonsConfig.push(this.createNormalButtonConfig(6));
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.minus, false))

    this.buttonsConfig.push(this.createNormalButtonConfig(1));
    this.buttonsConfig.push(this.createNormalButtonConfig(2));
    this.buttonsConfig.push(this.createNormalButtonConfig(3));
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.equal, true))

    this.buttonsConfig.push(this.createActionButton(ActionsEnum.backSpace, true))
    this.buttonsConfig.push(this.createNormalButtonConfig(0));
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.showCalcs, true))
  }

  private createNormalButtonConfig(numericValueWhenPressed: number): InputButtonConfiguration {
    const buttonConfig = new InputButtonConfiguration();

    buttonConfig.displayValue = numericValueWhenPressed.toString();
    buttonConfig.isActionButton = false;
    // buttonConfig.assetToDisplayName = assetToDisplayName;
    buttonConfig.numericValueWhenPressed = numericValueWhenPressed;

    return buttonConfig;
  }

  private createActionButton(actionValueWhenPressed : ActionsEnum, isInstantAction = false) {
    const buttonConfig = new InputButtonConfiguration();
    buttonConfig.displayValue = actionValueWhenPressed;
    buttonConfig.isActionButton = true;
    // buttonConfig.assetToDisplayName = assetToDisplayName;
    buttonConfig.actionValueWhenPressed = actionValueWhenPressed;
    buttonConfig.isInstantAction = isInstantAction;

    return buttonConfig;
  }


  onButtonPressed($event: InputButtonConfiguration) {
    this.buttonPressed.next($event);
  }
}
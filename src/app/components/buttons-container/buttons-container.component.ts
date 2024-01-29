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
  wasLastButtonPressedNumericAction = false;
  numericActions = [ActionsEnum.plus, ActionsEnum.minus];


  constructor() {
    this.setupButtonsConfig();
  }

  private setupButtonsConfig(): void {
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.showCalcs, true, 'history'))
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.ac, true))
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.multiply, true, undefined, true))
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.divide, true, undefined, true))

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

    this.buttonsConfig.push(this.createActionButton(ActionsEnum.backSpace, true, 'backspace'))
    this.buttonsConfig.push(this.createNormalButtonConfig(0));
    this.buttonsConfig.push(this.createActionButton(ActionsEnum.fullStop, true, undefined, true))
  }

  private createNormalButtonConfig(numericValueWhenPressed: number): InputButtonConfiguration {
    const buttonConfig = new InputButtonConfiguration();

    buttonConfig.displayValue = numericValueWhenPressed.toString();
    buttonConfig.isActionButton = false;
    buttonConfig.numericValueWhenPressed = numericValueWhenPressed;

    return buttonConfig;
  }

  private createActionButton(actionValueWhenPressed: ActionsEnum, isInstantAction = false, iconName: string | undefined = undefined, isDisabled = false) {
    const buttonConfig = new InputButtonConfiguration();
    buttonConfig.displayValue = actionValueWhenPressed;
    buttonConfig.isActionButton = true;
    buttonConfig.assetToDisplayName = iconName;
    buttonConfig.actionValueWhenPressed = actionValueWhenPressed;
    buttonConfig.isInstantAction = isInstantAction;
    buttonConfig.isDisabled = isDisabled;

    return buttonConfig;
  }

  onButtonPressed(buttonPressed: InputButtonConfiguration) {
    if (this.isButtonNumericAction(buttonPressed)) {
      this.disableOrEnableNumericActionButtons(true);
    } else {
      this.disableOrEnableNumericActionButtons(false);
    }
    this.wasLastButtonPressedNumericAction = this.isButtonNumericAction(buttonPressed);
    this.buttonPressed.next(buttonPressed);
  }

  disableOrEnableNumericActionButtons(newDisabledValue : boolean) {
    this.buttonsConfig.forEach(button => {
      if (this.numericActions.includes(button.actionValueWhenPressed)) {
        button.isDisabled = newDisabledValue;
      }
    })
  }

  private isButtonNumericAction(buttonConfig : InputButtonConfiguration) {
    return this.numericActions.includes(buttonConfig.actionValueWhenPressed);
  }
}

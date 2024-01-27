import {Component} from '@angular/core';
import {ButtonsContainerComponent} from "../buttons-container/buttons-container.component";
import {AnswerDisplayComponent} from "../answer-display/answer-display.component";
import {ActionsEnum} from "../../models/actions.enum";
import {InputButtonConfiguration} from "../../models/input-button-configuration";
import {InputButtonComponent} from "../input-button/input-button.component";

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [
    ButtonsContainerComponent,
    AnswerDisplayComponent
  ],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  currentCalculationButtons: InputButtonConfiguration[];
  pastCalculations: string[];
  lastCalculationAnswer = 0;
  lastPressedWasEquals = false;

  constructor() {
    this.currentCalculationButtons = [];
    this.pastCalculations = [];
  }

  onButtonPressed(buttonConfiguration: InputButtonConfiguration) {
    if (this.isClear(buttonConfiguration)) {
      this.currentCalculationButtons = [];
      return;
    }
    if (this.lastPressedWasEquals) {
      this.handleNewCalculationStart(buttonConfiguration);
      return;
    }
    this.currentCalculationButtons = this.currentCalculationButtons.filter(i => i != null);
    this.currentCalculationButtons.push(buttonConfiguration);
  }

  private handleNewCalculationStart(buttonConfiguration: InputButtonConfiguration) {
    this.lastPressedWasEquals = false;
    if (!buttonConfiguration.isActionButton) {
      this.currentCalculationButtons = [];
      this.currentCalculationButtons.push(buttonConfiguration);
      return;
    }
    const newFirstValue = new InputButtonConfiguration();
    newFirstValue.isActionButton = false;
    newFirstValue.numericValueWhenPressed = this.lastCalculationAnswer;
    newFirstValue.displayValue = this.lastCalculationAnswer.toString();
    this.currentCalculationButtons = [];
    this.currentCalculationButtons.push(newFirstValue, buttonConfiguration)
  }

  isClear(buttonConfiguration: InputButtonConfiguration) {
    return buttonConfiguration.actionValueWhenPressed === ActionsEnum.ac;
  }

  addToPastCalculations(pastCalculation: string) {
    this.pastCalculations.push(pastCalculation);
  }

  updateLastAnswer($event: number) {
    this.lastCalculationAnswer = $event;
    this.lastPressedWasEquals = true;
    this.currentCalculationButtons = [];
  }
}

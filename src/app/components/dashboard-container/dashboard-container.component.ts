import {Component, EventEmitter} from '@angular/core';
import {ButtonsContainerComponent} from "../buttons-container/buttons-container.component";
import {AnswerDisplayComponent} from "../answer-display/answer-display.component";
import {ActionsEnum} from "../../models/actions.enum";
import {InputButtonConfiguration} from "../../models/input-button-configuration";
import {PreviousCalculationsViewComponent} from "../previous-calculations-view/previous-calculations-view.component";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [
    ButtonsContainerComponent,
    AnswerDisplayComponent,
    PreviousCalculationsViewComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  currentCalculationButtons: InputButtonConfiguration[];
  pastCalculations: string[];
  lastCalculationAnswer = 0;
  lastPressedWasEquals = false;
  fullHeightHistory = false;
  eraseLastValue = new EventEmitter<void>;

  constructor() {
    this.currentCalculationButtons = [];
    this.pastCalculations = [];
  }

  onButtonPressed(buttonConfiguration: InputButtonConfiguration) {
    if (this.isClear(buttonConfiguration)) {
      this.currentCalculationButtons = [];
      return;
    }

    if (this.isBackSpace(buttonConfiguration)) {
      // const newList = Object.assign([], this.currentCalculationButtons)
      // newList.splice(this.currentCalculationButtons.length - 1, 1)
      // this.currentCalculationButtons = Object.assign([], newList)
      this.eraseLastValue.next();
      return;
    }

    if (this.isViewPastFullHeight(buttonConfiguration)) {
      this.toggleFullHeightPrevious();
      return;
    }

    if (this.lastPressedWasEquals) {
      this.handleNewCalculationStart(buttonConfiguration);
      return;
    }

    this.currentCalculationButtons = this.currentCalculationButtons.filter(i => i != null);
    this.currentCalculationButtons.push(buttonConfiguration);
  }

  toggleFullHeightPrevious() {
    this.fullHeightHistory = !this.fullHeightHistory;
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

  isBackSpace(buttonConfiguration: InputButtonConfiguration) {
    return buttonConfiguration.actionValueWhenPressed === ActionsEnum.backSpace;
  }

  isViewPastFullHeight(buttonConfiguration: InputButtonConfiguration) {
    return buttonConfiguration.actionValueWhenPressed === ActionsEnum.showCalcs;
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

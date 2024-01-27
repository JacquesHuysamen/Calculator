import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InputButtonConfiguration} from "../../models/input-button-configuration";
import {ActionsEnum} from "../../models/actions.enum";

@Component({
  selector: 'app-answer-display',
  standalone: true,
  imports: [],
  templateUrl: './answer-display.component.html',
  styleUrl: './answer-display.component.scss'
})
export class AnswerDisplayComponent {
  @Input() set currentValues(currentValues: InputButtonConfiguration[]) {
    this._currentValues = currentValues;
    if (!this.isLastButtonPressedEquals()) {
      this.addToCurrentCalcString();
      return;
    }
    this.checkLastButtonPressedAction();
  }

  get currentValues(): InputButtonConfiguration[] {
    return this._currentValues;
  }

  @Output()
  addNewPastCalculation = new EventEmitter<string>();

  @Output()
  newLastCalculatedAnswer = new EventEmitter<number>();

  get lastPressedButton() {
    return this.currentValues[this.currentValues.length - 1];
  }

  private _currentValues: InputButtonConfiguration[] = [];
  currentCalculationString = '';
  private lastWasEquals = false;


  private calculateAnswer() {
    let calculatedValue = 0;
    let currentCalcString = '';

    const inputs = this.currentValues;

    const firstActionIndex = inputs.findIndex(i => i.isActionButton);
    calculatedValue = this.combineNumbers(inputs.splice(0, firstActionIndex));
    currentCalcString = calculatedValue.toString();

    while (inputs.length) {
      const nextAction = inputs.shift();

      const nextActionIndex = inputs.findIndex(i => i.isActionButton);
      if (!nextAction || nextAction.actionValueWhenPressed === ActionsEnum.equal) {
        break;
      }
      const nextNum = this.combineNumbers(inputs.splice(0, nextActionIndex));

      calculatedValue = this.doCalculation(nextAction, nextNum, calculatedValue);
      currentCalcString += ` ${nextAction.actionValueWhenPressed} ${nextNum}`
    }

    // const firstNum = numberValues.pop();
    //
    // if (!firstNum) return;
    //
    // calculatedValue = parseInt(firstNum.displayValue);
    // currentCalcString = firstNum.displayValue;
    //
    // while (numberValues?.length && actionValues.length) {
    //   const nextAction = actionValues.pop();
    //   const nextNum = numberValues.pop();
    //
    //   if (!nextAction || !nextNum || nextAction.actionValueWhenPressed == ActionsEnum.equal) break;
    //
    //   calculatedValue = this.doCalculation(nextAction, nextNum, calculatedValue);
    //   currentCalcString += ` ${nextAction.actionValueWhenPressed} ${nextNum.numericValueWhenPressed}`
    // }

    this.currentCalculationString = currentCalcString + ` = ${calculatedValue}`;
    this.addNewPastCalculation.next(this.currentCalculationString);
    this.newLastCalculatedAnswer.next(calculatedValue);
    this.lastWasEquals = true;
  }

  private combineNumbers(numbers: InputButtonConfiguration[]) {
    let stringNumber = '';

    numbers.forEach(num => {
      stringNumber = stringNumber + num.displayValue;
    });

    return parseInt(stringNumber);
  }

  private checkLastButtonPressedAction() {
    const lastPressed = this.lastPressedButton;

    if (!lastPressed.isActionButton) return;

    switch (lastPressed.actionValueWhenPressed) {
      case ActionsEnum.equal:
        this.calculateAnswer();
        return;
      default:
        return;
    }
  }

  private doCalculation(action: InputButtonConfiguration, number: number, currentTotal: number): number {
    switch (action.actionValueWhenPressed) {
      case ActionsEnum.plus:
        return currentTotal + number;
      case ActionsEnum.minus:
        return currentTotal - number;
      default :
        return currentTotal;
    }
  }


  private isLastButtonPressedEquals() {
    const lastPressedButton = this.currentValues[this.currentValues.length - 1];
    return lastPressedButton && lastPressedButton.actionValueWhenPressed === ActionsEnum.equal;
  }

  private addToCurrentCalcString() {
    const lastPressedButton = this.currentValues[this.currentValues.length - 1]
    if (!lastPressedButton) {
      this.currentCalculationString = '';
      return;
    }

    if (this.lastWasEquals) {
      this.currentCalculationString = '';
      this.lastWasEquals = false;
      this.currentValues.forEach(i => this.addValueToCalcString(i))
      // this.addValueToCalcString(this.currentValues[0]);
      // this.addValueToCalcString(this.currentValues[1]);
      return;
    }

    this.addValueToCalcString(lastPressedButton);
  }

  private addValueToCalcString(button: InputButtonConfiguration) {
    const valueToAdd = button.actionValueWhenPressed ? button.actionValueWhenPressed.toString() : button.numericValueWhenPressed.toString();

    this.currentCalculationString = this.currentCalculationString + ` ${valueToAdd}`;
  }

}

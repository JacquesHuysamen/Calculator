import {ActionsEnum} from "./actions.enum";

export class InputButtonConfiguration {
  displayValue: string = "";
  isActionButton: boolean = false;
  assetToDisplayName: string | undefined;
  numericValueWhenPressed: number = -1;
  actionValueWhenPressed: ActionsEnum = ActionsEnum.noAction;
  isInstantAction = false;
  isDisabled = false;
}

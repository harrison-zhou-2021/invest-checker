import { InvestmentOptionEnum } from '../common/types';
import { TabEnum } from './store.types';

export enum ActionType {
    setActiveTab = 'app/set-active-tab',
    setInvestmentAmount = 'option/set-amount',
    setOptionPercentage = 'option/set-percentage',
    removeOption = 'option/remove',
    addEmptyOption = 'option/addEmpty',
}

export interface ISetActiveTab {
    type: ActionType.setActiveTab;
    payload: TabEnum;
}

export interface ISetInvestmentAmount {
    type: ActionType.setInvestmentAmount;
    payload: number;
}

export interface ISetOptionPercentage {
    type: ActionType.setOptionPercentage;
    payload: ISetOptionPercentagePayload;
}

export interface IRemoveOption {
    type: ActionType.removeOption;
    payload: number;
}

export interface IAddEmptyOption {
    type: ActionType.addEmptyOption;
}
export type Actions =
    | ISetActiveTab
    | ISetInvestmentAmount
    | ISetOptionPercentage
    | IRemoveOption
    | IAddEmptyOption;

export const SetActiveTab = (value: TabEnum): ISetActiveTab => ({
    type: ActionType.setActiveTab,
    payload: value,
});

export const SetInvestmentAmount = (value: number): ISetInvestmentAmount => ({
    type: ActionType.setInvestmentAmount,
    payload: value,
});

export interface ISetOptionPercentagePayload {
    id: number;
    option: InvestmentOptionEnum;
    percentage: number;
}

export const SetOptionPercentage = (
    payload: ISetOptionPercentagePayload
): ISetOptionPercentage => ({
    type: ActionType.setOptionPercentage,
    payload,
});

export const RemoveOption = (payload: number): IRemoveOption => ({
    type: ActionType.removeOption,
    payload,
});

export const AddEmptyOption = (): IAddEmptyOption => ({
    type: ActionType.addEmptyOption,
});

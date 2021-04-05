import { InvestmentOptionEnum } from '../common/types';

export interface IInvestmentOptionItem {
    id: number;
    option: InvestmentOptionEnum;
    percentage: number;
}

export interface IInvestmentOption {
    amount: number;
    options: IInvestmentOptionItem[];
}

export interface IROIResult {
    projectedReturn: number;
    totalFeesInUSD: number;
}

export enum TabEnum {
    INVESTMENT_OPTION = 'INVESTMENT_OPTION',
    ROI = 'ROI',
}

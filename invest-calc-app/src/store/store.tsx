import React, { createContext, useReducer } from 'react';
import { InvestmentOptionEnum } from '../common/types';
import { Actions, ActionType } from './store.actions';
import { IInvestmentOptionItem, TabEnum } from './store.types';

interface IStoreState {
    activeTab: TabEnum;
    investmentAmount: number;
    investOptionList: IInvestmentOptionItem[];
    nextOptionIndex: number;
}

interface IAppContext {
    state: IStoreState;
    dispatch: React.Dispatch<Actions>;
}

const optionInitialNum = 5;

const generateInitialOptionList = () => {
    let optionList: IInvestmentOptionItem[] = [];
    for (let i = 1; i <= optionInitialNum; i++) {
        optionList.push({
            id: i,
            option: InvestmentOptionEnum.NOT_SELECTED,
            percentage: 0,
        });
    }

    return optionList;
};

export const getAllOptions = (): InvestmentOptionEnum[] =>
    Object.keys(InvestmentOptionEnum) as InvestmentOptionEnum[];
const initialState: IStoreState = {
    activeTab: TabEnum.INVESTMENT_OPTION,
    investmentAmount: 100000,
    investOptionList: generateInitialOptionList(),
    nextOptionIndex: optionInitialNum + 1,
};

export const investOptionEnumDic = {
    [InvestmentOptionEnum.NOT_SELECTED]: '--select--',
    [InvestmentOptionEnum.CASH_INVESTMENTS]: 'Cash investments',
    [InvestmentOptionEnum.FIXED_INTEREST]: 'Fixed interest',
    [InvestmentOptionEnum.SHARES]: 'Shares',
    [InvestmentOptionEnum.MANAGED_FUNDS]: 'Managed funds',
    [InvestmentOptionEnum.ETF]: 'Exchange traded funds (ETFs)',
    [InvestmentOptionEnum.INVESTMENT_BONDS]: 'Investment bonds',
    [InvestmentOptionEnum.ANNUITIES]: 'Annuities',
    [InvestmentOptionEnum.LICs]: 'Listed investment companies (LICs)',
    [InvestmentOptionEnum.REITs]: 'Real estate investment trusts (REITs)',
};

export const store = createContext<IAppContext>({
    state: initialState,
    dispatch: () => null,
});

const { Provider } = store;

const reducer = (state: IStoreState, action: Actions) => {
    switch (action.type) {
        case ActionType.setActiveTab:
            return { ...state, activeTab: action.payload };
        case ActionType.setInvestmentAmount:
            return { ...state, investmentAmount: action.payload };
        case ActionType.setOptionPercentage: {
            const optionList = state.investOptionList.map((opt) => {
                if (opt.id !== action.payload.id) {
                    return opt;
                } else {
                    return { ...action.payload };
                }
            });

            const newState = {
                ...state,
                investOptionList: optionList,
            };
            return newState;
        }
        case ActionType.removeOption:
            return {
                ...state,
                investOptionList: state.investOptionList.filter(
                    (i) => i.id !== action.payload
                ),
            };
        case ActionType.addEmptyOption:
            return {
                ...state,
                investOptionList: [
                    ...state.investOptionList,
                    {
                        id: state.nextOptionIndex,
                        option: InvestmentOptionEnum.NOT_SELECTED,
                        percentage: 0,
                    },
                ],
                nextOptionIndex: state.nextOptionIndex + 1,
            };

        default:
            return state;
    }
};

export const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

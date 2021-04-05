import axios from 'axios';
import { InvestmentOptionEnum } from '../common/types';

const requestUrl = 'http://localhost:5000/api/InvestmentOptionCalc';

export interface IInvestmentOptionDtoItem {
    option: InvestmentOptionEnum;
    percentage: number;
}

export interface IFetchRoiRequest {
    investmentAmount: number;
    investmentOptions: IInvestmentOptionDtoItem[];
}

export interface IFetchRoiResponse {
    projectedReturnInAud: number;
    totalFeesInAud: number;
    totalFeesInUsd: number;
}

export const fetchRoi = async (
    request: IFetchRoiRequest
): Promise<IFetchRoiResponse> => {
    const response = await axios.post(requestUrl, {
        ...request,
    });

    return response.data;
};

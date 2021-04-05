import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { store } from '../store/store';

import {
    fetchRoi,
    IFetchRoiRequest,
    IInvestmentOptionDtoItem,
} from '../api/fetch-roi';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import StyledFieldset from './styled/StyledFieldset';
import { InvestmentOptionEnum } from '../common/types';

const ROIPanel: React.FC = () => {
    const {
        state: { investOptionList, investmentAmount },
    } = useContext(store);

    const request: IFetchRoiRequest = {
        investmentAmount,
        investmentOptions: investOptionList
            .filter((opt) => opt.option !== InvestmentOptionEnum.NOT_SELECTED)
            .map<IInvestmentOptionDtoItem>((o) => ({
                option: o.option,
                percentage: o.percentage,
            })),
    };

    const { isLoading, data, error } = useQuery('fetchRoi', () =>
        fetchRoi(request)
    );
    return (
        <>
            {isLoading && <Spinner animation="border" variant="primary" />}
            {error && <div>Someting went wrong ...</div>}

            {data && (
                <StyledFieldset>
                    <fieldset className="border p-2">
                        <legend className="w-auto">ROI</legend>
                        <Form>
                            <Row className="my-2">
                                <Col md="6">
                                    <Form.Group controlId="formProjectedReturn">
                                        <Form.Label>
                                            Projected Return in 1 Year
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            value={`${data.projectedReturnInAud.toFixed(
                                                2
                                            )} AUD`}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group controlId="formTotalFees">
                                        <Form.Label>Total Fees</Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            value={`${data.totalFeesInUsd.toFixed(
                                                2
                                            )} USD`}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </fieldset>
                </StyledFieldset>
            )}
        </>
    );
};

export default ROIPanel;

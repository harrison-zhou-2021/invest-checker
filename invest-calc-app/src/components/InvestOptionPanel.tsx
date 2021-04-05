import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { store } from '../store/store';
import { SetInvestmentAmount } from '../store/store.actions';
import { InvestmentOptionEnum } from '../common/types';
import { getNumberFromString, getNumberWithCommas } from '../utils';
import InvestOption from './InvestOption';

const Styles = styled.div`
    label {
        font-size: 1.25rem;
        font-weight: 600;
    }
`;

function InvestOptionPanel() {
    const {
        state: { investmentAmount, investOptionList },
        dispatch,
    } = useContext(store);
    const remainPercentage = investOptionList
        .filter((o) => o.option !== InvestmentOptionEnum.NOT_SELECTED)
        .reduce((acc, curr) => acc - curr.percentage, 100);
    const availableAmount =
        remainPercentage >= 0 ? (investmentAmount * remainPercentage) / 100 : 0;
    const handleAmountChange = (n: number) => {
        dispatch(SetInvestmentAmount(n));
    };

    return (
        <Styles>
            <Form>
                <Form.Group as={Row} controlId="formInvestmentAmount">
                    <Form.Label column sm="4">
                        Investment Amount
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            value={getNumberWithCommas(investmentAmount)}
                            onChange={(e) =>
                                handleAmountChange(
                                    getNumberFromString(e.target.value)
                                )
                            }
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                    controlId="formRemainAmount"
                    className="mb-4"
                >
                    <Form.Label column sm="4">
                        Available Amount:
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            value={getNumberWithCommas(availableAmount)}
                            disabled
                        />
                    </Col>
                </Form.Group>
            </Form>
            <InvestOption />
        </Styles>
    );
}

export default InvestOptionPanel;

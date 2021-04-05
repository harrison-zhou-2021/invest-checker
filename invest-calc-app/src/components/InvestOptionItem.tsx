import React from 'react';
import { Col, Form, InputGroup } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { InvestmentOptionEnum } from '../common/types';

import { investOptionEnumDic } from '../store/store';
import { IInvestmentOptionItem } from '../store/store.types';
import { getNumberFromString } from '../utils';
export interface Props {
    option: IInvestmentOptionItem;
    selectables: InvestmentOptionEnum[];
    handleOptionPercentageChange: (
        id: number,
        option: InvestmentOptionEnum,
        percentage: number
    ) => void;
    handleRemoveOption: (id: number) => void;
}

const InvestOptionItem: React.FC<Props> = ({
    option,
    selectables,
    handleOptionPercentageChange,
    handleRemoveOption,
}) => {
    // filter
    const getOptionList = (opt: InvestmentOptionEnum): string =>
        investOptionEnumDic[opt];

    return (
        <Form.Row className="mb-3">
            <Col md={6}>
                <Form.Control
                    as="select"
                    value={option.option}
                    onChange={(e) =>
                        handleOptionPercentageChange(
                            option.id,
                            e.target.value as InvestmentOptionEnum,
                            option.percentage
                        )
                    }
                >
                    {selectables.map((opt) => (
                        <option key={opt} value={opt}>
                            {getOptionList(opt)}
                        </option>
                    ))}
                </Form.Control>
            </Col>
            <Col md={4}>
                <InputGroup>
                    <Form.Control
                        value={option.percentage || ''}
                        onChange={(e) =>
                            handleOptionPercentageChange(
                                option.id,
                                option.option,
                                getNumberFromString(e.target.value)
                            )
                        }
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
            <Col md={1} className="pt-1">
                <Icon.FileMinus
                    color="orange"
                    size="28"
                    onClick={() => handleRemoveOption(option.id)}
                />
            </Col>
        </Form.Row>
    );
};

export default InvestOptionItem;

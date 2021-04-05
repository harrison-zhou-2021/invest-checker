import React, { useContext } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { getAllOptions, store } from '../store/store';
import {
    AddEmptyOption,
    RemoveOption,
    SetOptionPercentage,
} from '../store/store.actions';
import { InvestmentOptionEnum } from '../common/types';
import InvestOptionItem from './InvestOptionItem';
import StyledFieldset from './styled/StyledFieldset';

const InvestOption: React.FC = () => {
    const { addToast } = useToasts();
    const {
        state: { investOptionList },
        dispatch,
    } = useContext(store);

    const optInOptionList = investOptionList
        .filter((o) => o.option !== InvestmentOptionEnum.NOT_SELECTED)
        .map((opt) => opt.option);

    const getOptionList = (
        opt: InvestmentOptionEnum
    ): InvestmentOptionEnum[] => {
        return getAllOptions().filter(
            (o) =>
                o === opt ||
                o === InvestmentOptionEnum.NOT_SELECTED ||
                !optInOptionList.includes(o)
        );
    };

    const handlePercentageChange = (
        id: number,
        option: InvestmentOptionEnum,
        percentage: number
    ): void => {
        const availablePercentage = investOptionList
            .filter(
                (i) =>
                    i.option !== InvestmentOptionEnum.NOT_SELECTED &&
                    i.id !== id
            )
            .reduce((acc, curr) => acc - curr.percentage, 100);
        if (availablePercentage < percentage) {
            addToast(
                `Available percentage is ${availablePercentage}%, please check`,
                {
                    appearance: 'warning',
                }
            );
        } else {
            dispatch(SetOptionPercentage({ id, option, percentage }));
        }
    };
    const handleAddNewOption = () => {
        dispatch(AddEmptyOption());
    };

    const handleRemoveOption = (id: number) => {
        if (investOptionList.length <= 1) {
            addToast('Can not remove the last invest option', {
                appearance: 'warning',
            });
        } else {
            dispatch(RemoveOption(id));
        }
    };
    return (
        <StyledFieldset>
            <fieldset className="border p-2">
                <legend className="w-auto">Investment Option</legend>
                <Form>
                    {investOptionList.map((option) => (
                        <InvestOptionItem
                            option={option}
                            selectables={getOptionList(option.option)}
                            key={option.id}
                            handleOptionPercentageChange={
                                handlePercentageChange
                            }
                            handleRemoveOption={handleRemoveOption}
                        />
                    ))}
                    <Row className="my-2">
                        <Col md={{ offset: 9, span: 1 }}>
                            <Button onClick={handleAddNewOption}>Add</Button>
                        </Col>
                    </Row>
                </Form>
            </fieldset>
        </StyledFieldset>
    );
};

export default InvestOption;

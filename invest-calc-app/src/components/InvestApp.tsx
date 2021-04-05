import React, { useContext } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';

import { TabEnum } from '../store/store.types';
import { store } from '../store/store';
import { SetActiveTab } from '../store/store.actions';
import InvestOptionPanel from './InvestOptionPanel';
import ROIPanel from './ROIPanel';
import { useToasts } from 'react-toast-notifications';
import { InvestmentOptionEnum } from '../common/types';

const Styles = styled.div`
    nav {
        margin-top: 2rem;
        border-bottom: 4px solid #037bfe;
    }
    .nav-pills .nav-link {
        border-bottom-right-radius: 0rem;
        border-bottom-left-radius: 0rem;
    }
    .tab-content {
        padding: 2rem 1rem;
        border: 1px solid #dee2e6;
    }
`;

const InvestApp: React.FC = () => {
    const {
        state: { activeTab, investOptionList },
        dispatch,
    } = useContext(store);
    const { addToast } = useToasts();
    const handleChangeActiveTab = (selectedTab: TabEnum): void => {
        if (activeTab !== selectedTab) {
            if (selectedTab === TabEnum.ROI) {
                const investPercentage = investOptionList
                    .filter(
                        (o) => o.option !== InvestmentOptionEnum.NOT_SELECTED
                    )
                    .reduce((acc, curr) => acc + curr.percentage, 0);
                if (investPercentage === 0) {
                    addToast('Please finish in the investment options firest', {
                        appearance: 'warning',
                    });
                    return;
                }
            }
            dispatch(SetActiveTab(selectedTab as TabEnum));
        }
    };

    return (
        <Container>
            <Styles>
                <Tabs
                    id="controlled-tab-example"
                    variant="pills"
                    activeKey={activeTab}
                    onSelect={(e) => handleChangeActiveTab(e as TabEnum)}
                >
                    <Tab
                        eventKey={TabEnum.INVESTMENT_OPTION}
                        title="Investment Option"
                    >
                        <InvestOptionPanel />
                    </Tab>
                    <Tab eventKey={TabEnum.ROI} title="ROI">
                        <ROIPanel />
                    </Tab>
                </Tabs>
            </Styles>
        </Container>
    );
};

export default InvestApp;

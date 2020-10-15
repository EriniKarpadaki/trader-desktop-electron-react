import React, { useState, useEffect, FunctionComponent } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import OfferingContent from '../components/Offering/OfferingContent';
import Summary from '../components/Summary';
import { setFilterKey, getOfferings } from '../features/offering/offeringSlice';

type OfferingPageProps = {};

const OfferingPage: FunctionComponent<OfferingPageProps> = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOfferings());
  }, []);

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: '600px', width: '100%' }}
    >
      <Summary>
        Context Based more Attributes or summary level details will be displayed
        here. Please let me know the details. 1.2.0
      </Summary>
      <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
        <Tab eventKey="all" title="All">
          <OfferingContent state="all" />
        </Tab>

        <Tab eventKey="responded" title="Responded">
          <OfferingContent state={3} />
        </Tab>

        <Tab eventKey="passed" title="Passed">
          <OfferingContent state={2} />
        </Tab>

        <Tab eventKey="won" title="Won">
          <OfferingContent state={5} />
        </Tab>

        <Tab eventKey="lost" title="Lost">
          <OfferingContent state={4} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default OfferingPage;

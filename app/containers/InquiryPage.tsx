import React, { useState, useEffect, FunctionComponent } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import InquiryContent from '../components/Inquiry/InquiryContent';
import Summary from '../components/Summary';
import { setFilterKey, getInquiries } from '../features/inquiry/inquirySlice';

type InquiryPageProps = {};

const InquiryPage: FunctionComponent<InquiryPageProps> = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInquiries());
  }, []);

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: '600px', width: '100%' }}
    >
      <Summary>
        Context Based more Attributes or summary level details will be displayed
        here. Please let me know the details. 1.3.0
      </Summary>
      <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
        <Tab eventKey="all" title="All">
          <InquiryContent state="all" />
        </Tab>

        <Tab eventKey="responded" title="Responded">
          <InquiryContent state={3} />
        </Tab>

        <Tab eventKey="passed" title="Passed">
          <InquiryContent state={2} />
        </Tab>

        <Tab eventKey="won" title="Won">
          <InquiryContent state={5} />
        </Tab>

        <Tab eventKey="lost" title="Lost">
          <InquiryContent state={4} />
        </Tab>
      </Tabs>
      ;
    </div>
  );
};

export default InquiryPage;

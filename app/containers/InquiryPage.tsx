import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import InquiryContent from '../components/Inquiry/InquiryContent';
import Summary from '../components/Summary';

const InquiryPage = () => {
  const [key, setKey] = useState<any>('all');

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: '600px', width: '100%' }}
    >
      <Summary>
        Context Based more Attributes or summary level details will be displayed
        here. Please let me know the details. 1.0.1
      </Summary>
      <Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
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
    </div>
  );
};

export default InquiryPage;

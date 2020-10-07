import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import OfferingContent from '../components/Offering/OfferingContent';
import Summary from '../components/Summary';

const OfferingPage = () => {
  const [key, setKey] = useState<any>('all');

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: '600px', width: '100%' }}
    >
      <Summary>
        Context Based more Attributes or summary level details will be displayed
        here. Please let me know the details.
      </Summary>
      <Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
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

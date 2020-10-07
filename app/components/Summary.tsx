import React, { FunctionComponent,ReactNode } from 'react'; // importing FunctionComponent

type SummaryProps = {
  children:ReactNode
};

const Summary: FunctionComponent<SummaryProps> = ({ children }) => (
  <div className="summary-container">
    {children}
  </div>
);

export default Summary;

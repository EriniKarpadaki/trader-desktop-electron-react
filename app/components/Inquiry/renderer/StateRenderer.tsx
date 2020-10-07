import React, { FunctionComponent } from 'react'; // importing FunctionComponent

type StateRendererProps = {
  data: any;
};

const StateRenderer: FunctionComponent<StateRendererProps> = ({ data }) => {
  let state = 'New';
  if (data.state === 2) {
    state = 'Passed';
  } else if (data.state === 3) {
    state = 'Responded';
  } else if (data.state === 4) {
    state = 'Lost';
  } else if (data.state === 5) {
    state = 'Won';
  }

  return <span style={{ color: '#17a2b8' }}>{state}</span>;
};

export default StateRenderer;

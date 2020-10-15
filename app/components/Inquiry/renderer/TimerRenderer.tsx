import React, { FunctionComponent } from 'react';
import Countdown from 'react-countdown';

type TimerRendererProps = {
  data: any;
};

const TimerRenderer: FunctionComponent<TimerRendererProps> = ({ data }) => {
  return <Countdown date={Date.now() + data.timer} />;
};
export default TimerRenderer;

import React from 'react';
import Countdown from 'react-countdown';

const TimerRenderer = () => {
  return <Countdown date={Date.now() + 100000} />;
};
export default TimerRenderer;

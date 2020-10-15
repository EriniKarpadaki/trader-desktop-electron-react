import React, { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editInquiry } from '../features/inquiry/inquirySlice';
import Navbar from './layout/TopNavbar';
// import Footer from './layout/Footer';
import styles from './App.css';

const kafka = require('kafka-node');
const config = require('../kafka/config');

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const dispatch = useDispatch();
  const { children } = props;

  try {
    const { Consumer } = kafka;
    const client = new kafka.KafkaClient({
      idleConnection: 24 * 60 * 60 * 1000,
      kafkaHost: config.KafkaHost,
    });

    const consumer = new Consumer(
      client,
      [{ topic: config.KafkaTopic, partition: 0 }],
      {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        // fromOffset: false
      }
    );
    consumer.on('message', async function (message) {
      console.log('kafka ', JSON.parse(message.value));
      dispatch(editInquiry(JSON.parse(message.value)));
    });
    consumer.on('error', function (error) {
      //  handle error
      console.log('error', error);
    });
  } catch (error) {
    // catch error trace
    console.log(error);
  }
  return (
    <div className={styles.App}>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
}

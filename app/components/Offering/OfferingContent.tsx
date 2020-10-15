import React, { useState, useEffect, FunctionComponent } from 'react'; // importing FunctionComponent
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { useSelector, useDispatch } from 'react-redux';

import OfferBtnRenderer from './renderer/OfferBtnRenderer';
import TimerRenderer from './renderer/TimerRenderer';
import StateRenderer from './renderer/StateRenderer';
import config from '../../constants/config.json';
import { selectFilteredOfferings } from '../../features/offering/offeringSlice';

const Kafka = require('kafka-node');
const kafkaConfig = require('../../kafka/config');

const { Producer } = Kafka;
const client = new Kafka.KafkaClient({ kafkaHost: kafkaConfig.KafkaHost });
const producer = new Producer(client, { requireAcks: 0, partitionerType: 2 });

type OfferingContentProps = {
  state: any;
};

const OfferingContent: FunctionComponent<OfferingContentProps> = ({
  state,
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const dispatch = useDispatch();
  const offerings = useSelector(selectFilteredOfferings);

  useEffect(() => {
    // readItems();
  });

  const pushDataToKafka = () => {
    const dataToPush = { test: 'test data' };
    console.log(dataToPush);
    try {
      const payloadToKafkaTopic = [
        { topic: kafkaConfig.KafkaTopic, messages: JSON.stringify(dataToPush) },
      ];
      console.log(payloadToKafkaTopic);
      producer.send(payloadToKafkaTopic, (err: any, data: any) => {
        console.log('data: ', data);
      });
      producer.on('error', function (err: any) {
        console.log('kafka-error:', err);
      });
      // producer.on('ready', async function () {
      // });
    } catch (error) {
      console.log(error);
    }
  };

  function onGridReady(params: any) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  function onCellValueChanged(info: any) {
    const data = {
      newValue: info.newValue,
      field: info.colDef.field,
    };
    console.log(data);
    // here
  }

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: '400px', width: '' }}
    >
      <AgGridReact
        modules={[MenuModule, ColumnsToolPanelModule]}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
        paginationAutoPageSize
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          resizable: true,
          cellClass: 'align-center',
          headerClass: 'align-center-header',
          // valueFormatter: function (params) {
          //   return formatNumber(params.value);
          // },
        }}
        rowData={offerings.filter((offering) => {
          if (state == 'all') {
            return true;
          }
          return offering.state == state;
        })}
        immutableData
        getRowNodeId={(data) => data.id}
      >
        <AgGridColumn
          field="timer"
          cellRendererFramework={TimerRenderer}
          maxWidth="100"
          width="100"
        />

        <AgGridColumn field="group" maxWidth="200" width="100" />

        <AgGridColumn field="symbol" maxWidth="200" width="100" />

        <AgGridColumn
          field="price"
          cellRenderer="agAnimateShowChangeCellRenderer"
          valueParser={numberValueParser}
          maxWidth="100"
          width="100"
          editable
        />

        <AgGridColumn
          field="action"
          cellRendererFramework={OfferBtnRenderer}
          maxWidth="130"
          minWidth="130"
        />

        <AgGridColumn
          field="quantity"
          cellRenderer="agAnimateShowChangeCellRenderer"
          valueParser={numberValueParser}
          // minWidth="400"
          width="700"
          editable
        />

        <AgGridColumn
          field="state"
          cellRendererFramework={StateRenderer}
          maxWidth="100"
        />
      </AgGridReact>
    </div>
  );
};

function numberValueParser(params) {
  return Number(params.newValue);
}

export default OfferingContent;

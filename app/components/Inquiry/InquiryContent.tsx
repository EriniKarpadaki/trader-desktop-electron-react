import React, { useState, useEffect, FunctionComponent } from 'react'; // importing FunctionComponent
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { useSelector, useDispatch } from 'react-redux';

import SideBtnRenderer from './renderer/SideBtnRenderer';
import SubmitBtnRenderer from './renderer/SubmitBtnRenderer';
import PassBtnRenderer from './renderer/PassBtnRenderer';
import TimerRenderer from './renderer/TimerRenderer';
import StateRenderer from './renderer/StateRenderer';
import { selectInquiries } from '../../features/inquiry/inquirySlice';
import PushDataToKafka from '../../kafka/producer';

type InquiryContentProps = {
  state: any;
  // readItems: Function;
};
console.log('out', PushDataToKafka);
const InquiryContent: FunctionComponent<InquiryContentProps> = ({ state }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const dispatch = useDispatch();
  const inquiries = useSelector(selectInquiries);

  useEffect(() => {}, []);

  function onGridReady(params: any) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  function onCellValueChanged(info: any) {
    const dataToPush = {
      newValue: info.newValue,
      field: info.colDef.field,
    };
    console.log('onCellValueChanged', dataToPush);
  }

  const valueSetter = (params) => {
    console.log(params);
    const dataToPush = {
      grid: 'inquiry',
      _id: params.data._id,
      newValue: params.newValue,
      field: params.colDef.field,
    };
    console.log(dataToPush);
    console.log('PushDataToKafka', PushDataToKafka);
    // return false;
    PushDataToKafka(dataToPush);
    return true;
  };

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: '400px', width: '', padding: '12px 10px' }}
    >
      <button onClick={PushDataToKafka}>kafka send data</button>
      <AgGridReact
        modules={[
          ClientSideRowModelModule,
          SetFilterModule,
          MenuModule,
          ColumnsToolPanelModule,
        ]}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
        paginationAutoPageSize
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          resizable: true,
          sortable: true,
          cellClass: 'align-center',
          headerClass: 'align-center-header',
          // valueFormatter: function (params) {
          //   return formatNumber(params.value);
          // },
        }}
        rowData={inquiries.filter((inq) => {
          if (state == 'all') {
            return true;
          }
          return inq.state == state;
        })}
        animateRows
        // immutableData
        // getRowNodeId={(data) => data.id}
        // reactNext
        // deltaRowDataMode
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
          valueSetter={valueSetter}
        />

        <AgGridColumn
          field="side"
          cellRenderer={SideBtnRenderer}
          maxWidth="110"
          minWidth="110"
        />

        <AgGridColumn
          field="action"
          cellRenderer={SubmitBtnRenderer}
          maxWidth="130"
          minWidth="130"
        />

        <AgGridColumn
          field="action"
          cellRenderer={PassBtnRenderer}
          maxWidth="110"
          minWidth="110"
        />

        <AgGridColumn
          field="quantity"
          cellRenderer="agAnimateShowChangeCellRenderer"
          valueParser={numberValueParser}
          // minWidth="400"
          width="700"
          editable
          valueSetter={valueSetter}
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

function numberValueParser(params: { newValue: any }) {
  return Number(params.newValue);
}

export default InquiryContent;

import React, { useState, useEffect, FunctionComponent } from 'react'; // importing FunctionComponent
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

import OfferBtnRenderer from './renderer/OfferBtnRenderer';
import TimerRenderer from './renderer/TimerRenderer';
import StateRenderer from './renderer/StateRenderer';
import config from '../../constants/config.json';

type OfferingContentProps = {
  state: any;
};

const OfferingContent: FunctionComponent<OfferingContentProps> = ({
  state,
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  useEffect(() => {
    // readItems();
  });

  function onGridReady(params: any) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const httpRequest = new XMLHttpRequest();
    const updateData = (data: any) => {
      const fakeServer = createFakeServer(data);
      const datasource = createServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
    };

    httpRequest.open('GET', `${config.ServerUrl}/offerings?state=${state}`);
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
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
        modules={[ServerSideRowModelModule, MenuModule, ColumnsToolPanelModule]}
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
        rowModelType="serverSide"
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

function createServerSideDatasource(server) {
  return {
    getRows(params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      const response = server.getData(params.request);
      setTimeout(function () {
        if (response.success) {
          params.successCallback(response.rows, response.lastRow);
        } else {
          params.failCallback();
        }
      }, 500);
    },
  };
}
function createFakeServer(allData) {
  return {
    getData(request) {
      const requestedRows = allData.slice(request.startRow, request.endRow);
      const lastRow = getLastRowIndex(request, requestedRows);
      return {
        success: true,
        rows: requestedRows,
        lastRow,
      };
    },
  };
}
function getLastRowIndex(request, results) {
  if (!results) return undefined;
  const currentLastRow = request.startRow + results.length;
  return currentLastRow < request.endRow ? currentLastRow : undefined;
}

export default OfferingContent;

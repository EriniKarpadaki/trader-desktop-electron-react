import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import axios from 'axios';
import config from '../../constants/config.json';

const offeringSlice = createSlice({
  name: 'offering',
  initialState: {
    value: 0,
    filter: 'all',
    offerings: [
      {
        timer: 300000,
        group: 'Celica',
        symbol: 'Celica',
        price: 35000,
        quantity: 234,
        state: '5',
      },
    ],
  },
  reducers: {
    setOfferings: (state, action) => {
      console.log('action.payload', action);
      state.offerings = action.payload;
    },
    setFilterKey: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setOfferings, setFilterKey } = offeringSlice.actions;

export const getOfferings = (): AppThunk => {
  return (dispatch) => {
    axios
      .get(`${config.ServerUrl}/offerings?state=all`) // req data from server
      .then(({ data }) => {
        // if data is found
        console.log('success retrieved', data);
        dispatch(setOfferings(data));
      })
      .catch((error) => console.log('error', error)); // errors
  };
};

export default offeringSlice.reducer;

export const selectCount = (state: RootState) => state.offering.value;
export const selectOfferings = (state: RootState) => state.offering.offerings;
export const selectFilteredOfferings = (state: RootState) => {
  if (state.offering.filter == 'all') {
    return state.offering.offerings;
  } else {
    return state.offering.offerings.filter(
      (inqu) => inqu.state == state.offering.filter
    );
  }
};

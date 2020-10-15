import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import axios from 'axios';
import config from '../../constants/config.json';

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState: {
    value: 0,
    filter: 'all',
    inquiries: [
      {
        _id: 12,
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
    setInquiries: (state, action) => {
      console.log('action.payload', action, state.inquiries);
      state.inquiries = action.payload;
    },
    setFilterKey: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setInquiries, setFilterKey } = inquirySlice.actions;

export const getInquiries = (): AppThunk => {
  return (dispatch) => {
    axios
      .get(`${config.ServerUrl}/inquiries?state=all`) // req data from server
      .then(({ data }) => {
        // if data is found
        console.log('success retrieved', data);
        dispatch(setInquiries(data));
      })
      .catch((error) => console.log('error', error)); // errors
  };
};
export const editInquiry = (editedInquiry): AppThunk => {
  return (dispatch, getState) => {
    console.log('editInquiry redux', editedInquiry);
    const state = getState();
    let inquiries = [...state.inquiry.inquiries];
    inquiries = inquiries.map((inquiry) => {
      if (inquiry._id !== editedInquiry._id) {
        return inquiry;
      } else {
        let temp = { ...inquiry };
        temp[editedInquiry.field] = editedInquiry.newValue;
        console.log('temp', temp);
        return temp;
      }
    });

    dispatch(setInquiries(inquiries));
  };
};
export default inquirySlice.reducer;

export const selectCount = (state: RootState) => state.inquiry.value;
export const selectInquiries = (state: RootState) => state.inquiry.inquiries;
export const selectFilteredInquiries = (state: RootState) => {
  if (state.inquiry.filter == 'all') {
    return state.inquiry.inquiries;
  } else {
    return state.inquiry.inquiries.filter(
      (inqu) => inqu.state == state.inquiry.filter
    );
  }
};

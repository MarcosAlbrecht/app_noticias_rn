import {configureStore} from '@reduxjs/toolkit';
import newsSlice from './newsSlice';

const store = configureStore({
  reducer: {
    news: newsSlice,
    //other: otherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

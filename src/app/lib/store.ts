import { configureStore } from "@reduxjs/toolkit";
import vendorsReducer from "@/app/lib/VendorsSlice";

const store = configureStore({
  reducer: {
    vendorDataStore: vendorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
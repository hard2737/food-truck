import { createSlice } from '@reduxjs/toolkit'
import { VendorRecord } from './VendorRecord'
import { SF_FOOD_TRUCK_DATA_SOURCE_URL } from './Constants'

export type VendorsState = {
    source: string
    error: string | null
    loading: boolean
    allVendors: VendorRecord[]
    foundVendors: VendorRecord[]
    search: string | null
}

const initialState: VendorsState = {
    source: SF_FOOD_TRUCK_DATA_SOURCE_URL,
    error: null,
    loading: true,
    allVendors: [],
    foundVendors: [],
    search: null,
};

// This project uses immer under the hood, so we can write "mutating" code
// It feels unnatural at first, but it allows us to write more readable code,
// forget your old redux immutable state rules 
export const vendorsSlice = createSlice({
    name: 'vendorDataStore',
    initialState: initialState,
    reducers: {
        setVendors: (state, action) => {
            state.allVendors= action.payload;
        },
        setFoundVendors: (state, action) => {
            state.foundVendors = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setVendors, setError, setLoading, setSearch, setFoundVendors } = vendorsSlice.actions

export default vendorsSlice.reducer
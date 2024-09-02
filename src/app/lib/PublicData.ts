"use client"
import { setLoading, setVendors, setError } from './VendorsSlice';
import { getDataFromLocalStorageIfPossible, saveDataToLocalStorageIfPossible } from './Utils';
import SFTableDataGenerator from './SFTableDataProcessor';
import { SF_FOOD_TRUCK_DATA_SOURCE_URL } from './Constants';

// TODO add other data sources for fun
export function TableGeneratorFactory(source: string) {
    switch (source) {
        case SF_FOOD_TRUCK_DATA_SOURCE_URL:
            return SFTableDataGenerator();
            break;
        default:
            return  new Promise((_, reject) => {
                reject(new Error(`Generator for '${source}' not found`));
              }); 
    }
}
export async function fetchTruckDataThunk(dispatch: any, source: string) {

    dispatch(setLoading( true ));

    const cachedData = getDataFromLocalStorageIfPossible(source);
    if (cachedData) {
        dispatch(setVendors( cachedData ));
        dispatch(setLoading( false ));
    }
    else {
        const tableGenerator = TableGeneratorFactory(source);
        tableGenerator.then((data : any) => {
            dispatch(setVendors( data ));
            saveDataToLocalStorageIfPossible(source, data);
            dispatch(setLoading( false ));
        }).catch((reason: string) => {
            dispatch(setError(reason))
            dispatch(setLoading( false ));
        })
    }
    
}
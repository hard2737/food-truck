"use client";

// import Papa from 'papaparse'
import { VendorRecord } from '@/app/lib/VendorRecord'

import { useEffect } from 'react';
import { fetchTruckDataThunk } from '@/app/lib/PublicData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store';
import VendorCard from './VendorCard';
import styles from "./VendorList.module.css";

function VendorList() {
    const dispatch = useDispatch();
    const allVendors = useSelector((state: RootState): VendorRecord[] => {  return state.vendorDataStore.allVendors });
    const error = useSelector((state: RootState): string | null => state.vendorDataStore.error);
    const loading = useSelector((state: RootState): boolean => state.vendorDataStore.loading);
    const searchTerm = useSelector((state: RootState): string => state.vendorDataStore.search ?? '');
    const foundVendors = useSelector((state: RootState): VendorRecord[] => (searchTerm ==='' || searchTerm===null) ? allVendors : state.vendorDataStore.foundVendors);
    const dataSource = useSelector((state: RootState): string => state.vendorDataStore.source);

    useEffect(() => {
        fetchTruckDataThunk(dispatch,dataSource);
    }, []);

    const notification = (message:string) => (<div className={styles.loadingContainer}><div className={styles.loadingContent}>{message}</div></div>)
    if (error) {
        return notification(error);
    }

    const list = (searchTerm ==='' || searchTerm===null) ? allVendors : foundVendors;

    if (loading) {
        return notification("Loading...");
    }


    return (
        <div className={styles.outer}>
            <div>{`${list.length} vendors found:`}</div>
            {list.map((vendor: VendorRecord) => {
                const listKey = `vc.${self.crypto.randomUUID()}${vendor.PrimaryKey}`;
                return <VendorCard key={listKey} vendor={vendor} />
            })}
        </div>
    );
}

export default VendorList;
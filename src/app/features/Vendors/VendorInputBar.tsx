import { RootState } from '@/app/lib/store';
import { VendorRecord } from '@/app/lib/VendorRecord';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { setSearch, setFoundVendors } from '@/app/lib/VendorsSlice';



export default function VendorInputBar() {
    const dispatch = useDispatch();
    const vendors = useSelector((state: RootState): VendorRecord[] => {  return state.vendorDataStore.allVendors });

    const options: string[] = [];
    vendors.forEach(v => {
        v.MenuItems.forEach(mi => {
            if (!options.some(fmi => mi === fmi)) {
                options.push(mi);
            }
        });
    });
    const handleInputChange = (event:any, newInputValue:string) => {
        const findMatching = (searchTerm: string) => {
            const found:VendorRecord[] = [];
            vendors.forEach((aVendor) => {
                aVendor.MenuItems.forEach((menuItem) => {
                    // TODO care about locale lower case?
                    if (menuItem.trim().toLowerCase().search(searchTerm.trim().toLowerCase()) !== -1) {
                        found.push(aVendor);
                    }
                });
            });
            if (found.length > 0) {
                dispatch(setSearch(searchTerm));
                dispatch(setFoundVendors(found));
            }
        };
        findMatching(newInputValue);
    };

  return (
    <div>
        <Autocomplete disablePortal
            options={options}
            sx={{ width: '100vw' }}
            onInputChange={handleInputChange}
            renderInput={(params) => <TextField {...params} label={`What do you want to eat? (${options.length} menu items await!)`} />}/>
    </div>
  )
}

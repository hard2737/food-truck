import React from 'react'
import { VendorRecord } from '@/app/lib/VendorRecord';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import PlaceIcon from '@mui/icons-material/Place';
import WarningIcon from '@mui/icons-material/Warning';
import Dangerous from '@mui/icons-material/Dangerous';
import styles from "./VendorCard.module.css";


export default function VendorCard({ vendor }: { vendor: VendorRecord }) {
    function getFacilityType() {
        const type = `${vendor.VendorType}`;
        switch (type.toLowerCase()) {
            case 'truck':
                return (<LocalShippingIcon aria-label={type} aria-description={type} aria-details={type} />)
            case 'push cart':
                return (<RvHookupIcon aria-label={type} aria-description={type} aria-details={type} />)
            default:
                const typeDesc = type==="null" || type === "" ? "‽" : type;
                return (<><OutdoorGrillIcon aria-label={typeDesc} aria-description={typeDesc} aria-details={typeDesc} />{typeDesc}</>)
        }
    }
    function getBlockLot() { 
        const bl = `${vendor.BlockLot}`.trim();
        return bl !== 'null' && bl !== '' ?
            (<a href={`https://sfplanninggis.org/pim/?tab=Property&search=${bl}`} target='_blank'><PlaceIcon /></a>)
            : (<></>)
    }
    function getStatus() { 
        const status = vendor.Status;
        const statusType = status.toLowerCase().trim();
        const message = (<sup><sub>Status: Permit {status}</sub></sup>);
        let statusContent;
        switch (statusType) {
            case 'approved':
                statusContent = (<div className={styles.statusOK}>{message}</div>);
                break;
            case 'suspend':
            case 'expired':
                statusContent = (<div className={styles.statusBummer}><Dangerous aria-label={status} aria-description={status} aria-details={status} />{message}</div>)
                break;
            default:
                statusContent = (<div className={styles.statusWarn}><WarningIcon aria-label={status} aria-description={status} aria-details={status} />{message}</div>)
                break;
        }
        return <div className={styles.statusLine}>{statusContent}</div>
    }
    function getMenu() {
        let menuItemCounter = 0;
        return (<ul>{vendor.MenuItems.map(menuItem =>
        (<li key={`mi${vendor.PrimaryKey}${menuItem}+${menuItemCounter++}`}>
            {menuItem}</li>))}</ul>)
    }

    function getLocation() {
        const latLon = vendor.Location.replace("(", "").replace(")", "").replace(" ", "");
        const coords = latLon.split(",");
        if (coords.length === 2 && coords[0] !== "0.0" && coords[1] !== "0.0") {
            return (<a href={`https://www.google.com/maps/search/?api=1&query=${latLon}`} target='_blank'><PlaceIcon/></a>);
        }
        return (<></>)
    }
    function getAddress() {
        return vendor.Address ? (<div>{vendor.Address}</div>) : null;
    }
    function getExtendedAddress() {
        return vendor.ExtendedInfoAddress ? (<div className={styles.extendedAddress}>{vendor.ExtendedInfoAddress}</div>): null;
    }

    const card = (<div className={styles.card} key={`card${vendor.PrimaryKey}`}>

        
        <div className={styles.name}>
            <div className={styles.facilityType}>{getFacilityType()}</div>
            <div className={styles.businessName}>{vendor.BusinessName}</div>
        </div>
        <div className={styles.menu}>{getMenu()}</div>
        <div className={styles.location}>
            {getAddress()}
            {getLocation()}
            {getExtendedAddress()}
            {getBlockLot()}
        </div>
        {getStatus()}

    </div>);
    return card;
}

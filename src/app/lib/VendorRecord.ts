export interface IVendorRecord {
    PrimaryKey: string,
    BusinessName: string,
    VendorType: string,
    MenuItems: string[],

    Address: string,
    ExtendedInfoAddress: string,
    Latitude: string,
    Longitude: string,
    Location: string,
    BlockLot: string,

    Permit: string,
    Status: string,
    Approved: string,
    Received: string,
    PriorPermit: string,
    ExpirationDate: string,
}

export class VendorRecord implements IVendorRecord {
    PrimaryKey: string='';
    BusinessName: string='';
    VendorType: string='';
    MenuItems: string[]=[];

    Address: string='';
    ExtendedInfoAddress: string='';
    Latitude: string='';
    Longitude: string='';
    Location: string='';
    BlockLot: string='';

    Permit: string='';
    Status: string='';
    Approved: string='';
    Received: string='';
    PriorPermit: string='';
    ExpirationDate: string='';
}
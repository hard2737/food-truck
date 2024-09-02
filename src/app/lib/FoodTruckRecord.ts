// Data types: https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/about_data
// TODO, got lazy on types
// didn't check more thoroughly because I grew tired of trying to match it up
// it doesn't seem really consistent with what's in the csv exactly, decided to 
// learn more by looking at the data as I encountered it
//
// what about encoding?! are we good?
//
// is the data https://data.sfgov.org/api/views/rqzj-sfat/rows.csv
// https://datatracker.ietf.org/doc/html/rfc4180 compliant?

/*
CSV data column headers
locationid,
Applicant,
FacilityType,
cnn,
LocationDescription,
Address,
blocklot,
block,
lot,
permit,
Status,
FoodItems,
X,
Y,
Latitude,
Longitude,
Schedule,
dayshours,
NOISent,
Approved,
Received,
PriorPermit,
ExpirationDate,
Location,
Fire Prevention Districts,
Police Districts,
Supervisor Districts,
Zip Codes,
Neighborhoods (old)

Sampling of JSON
{
    "locationid": 1723825,
    "Applicant": "Natan's Catering",
    "FacilityType": "Truck",
    "cnn": 7727000,
    "LocationDescription": "KANSAS ST: 16TH ST to 17TH ST (300 - 399)",
    "Address": "350 KANSAS ST",
    "blocklot": "3958001D",
    "block": 3958,
    "lot": "001D",
    "permit": "23MFF-00006",
    "Status": "APPROVED",
    "FoodItems": "Burgers: melts: hot dogs: burritos:sandwiches: fries: onion rings: drinks",
    "X": 6011363.148,
    "Y": 2106748.619,
    "Latitude": 37.76537066931712,
    "Longitude": -122.40390784821223,
    "Schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=23MFF-00006&ExportPDF=1&Filename=23MFF-00006_schedule.pdf",
    "dayshours": null,
    "NOISent": null,
    "Approved": "09/12/2023 12:00:00 AM",
    "Received": 20230911,
    "PriorPermit": 1,
    "ExpirationDate": "11/15/2024 12:00:00 AM",
    "Location": "(37.76537066931712, -122.40390784821223)",

    "Fire Prevention Districts": 8,

    "Police Districts": 3,

    "Supervisor Districts": 8,

    "Zip Codes": 28853,

    "Neighborhoods (old)": 20
}

*/

export interface IFoodTruckRecord {
    PrimaryKey: string,
    locationid: number, 
    Applicant: string, 
    FacilityType: string,
    cnn: number,
    LocationDescription: string,
    Address: string,
    blocklot: string,
    block: string,
    lot: string,
    permit: string,
    Status: string,
    FoodItems: string,
    X: string,
    Y: string,
    Latitude: string,
    Longitude: string,
    Schedule: string,
    dayshours: string,
    NOISent: string,
    Approved: string,
    Received: string,
    PriorPermit: string,
    ExpirationDate: string,
    Location: string,
    FirePreventionDistricts: string, // boring or not sure what to do
    PoliceDistricts: string, // boring or not sure what to do
    SupervisorDistricts: string, // boring or not sure what to do
    ZipCodes: string, // boring or not sure what to do
    Neighborhoodsold: string, // boring or not sure what to do
}

export class FoodTruckRecord implements IFoodTruckRecord {
    PrimaryKey: string = '';
    locationid: number = 0;
    Applicant: string = '';
    FacilityType: string = '';
    cnn: number = 0;
    LocationDescription: string = '';
    Address: string = '';
    blocklot: string = '';
    block: string = '';
    lot: string = '';
    permit: string = '';
    Status: string = '';
    FoodItems: string = '';
    X: string = '';
    Y: string = '';
    Latitude: string = '';
    Longitude: string = '';
    Schedule: string = '';
    dayshours: string = '';
    NOISent: string = '';
    Approved: string = '';
    Received: string = '';
    PriorPermit: string = '';
    ExpirationDate: string = '';
    Location: string = '';
    FirePreventionDistricts: string = '';
    PoliceDistricts: string = '';
    SupervisorDistricts: string = '';
    ZipCodes: string = '';
    Neighborhoodsold: string = '';
}
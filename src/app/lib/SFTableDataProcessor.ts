import { SF_FOOD_TRUCK_DATA_SOURCE_URL } from "./Constants";
import { FoodTruckRecord } from "./FoodTruckRecord";
import Papa from 'papaparse'
import { VendorRecord } from "./VendorRecord";

export default async function SFTableDataGenerator() {

  return new Promise((resolve, reject) => {
    try {
      (async () => {
        const res = await fetch(SF_FOOD_TRUCK_DATA_SOURCE_URL);
        const csvData = await res.text();

        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          // to be completely honest, this is a little bit of a mystery
          // I'm not 100% sure how result should be typed
          // I don't understand how the following csv columns are getting mapped properly, :magic: is a bad sign
          // "Fire Prevention Districts",
          // "Police Districts",
          // "Supervisor Districts",
          // "Zip Codes",
          // "Neighborhoods (old)"
          complete: (result: { data: FoodTruckRecord[] }) => {
            // adding pseudo primary keys
            // i found that the locationid wasn't unique 🤷 

            const records = [];
            for (let index = 0; index < result.data.length; index++) {
              const d = result.data[index];
              if (d.locationid) {

                const vendor = new VendorRecord();
                vendor.PrimaryKey = `${d.locationid}${self.crypto.randomUUID()}`;
                vendor.BusinessName = d.Applicant;
                vendor.VendorType = d.FacilityType;
                vendor.MenuItems = d?.FoodItems?.split(":")          // Split the string by colons
                  ?.map(part => part.trim())  // Trim any leading/trailing spaces
                  ?.filter(Boolean) // remove empty strings
                  || []; // blank if null

                vendor.Address = d.Address;
                vendor.ExtendedInfoAddress = d.LocationDescription;
                vendor.Latitude = d.Latitude;
                vendor.Longitude = d.Longitude;
                vendor.Location = d.Location;
                vendor.BlockLot = d.blocklot;

                vendor.Permit = d.permit;
                vendor.Status = d.Status;
                vendor.Approved = d.Approved;
                vendor.Received = d.Received;
                vendor.PriorPermit = d.PriorPermit;
                vendor.ExpirationDate = d.ExpirationDate;
                records.push(vendor);
              }
              // else {
              //   console.error('no location');
              // }
              
            }
            resolve(records);
          },
        });
      })();
    }
    catch (error: any) {
      reject(error)
    }
  });

}
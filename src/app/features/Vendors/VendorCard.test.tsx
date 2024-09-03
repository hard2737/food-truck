/**
 * @jest-environment jsdom
 */

import { render, screen, prettyDOM } from '@testing-library/react';
import VendorCard from './VendorCard';
import { VendorRecord } from '@/app/lib/VendorRecord';
import React from 'react';
import '@testing-library/jest-dom'


describe('VendorCard', () => {
    const vendor: VendorRecord = {
        BusinessName: "Johnny's Food Truck",
        VendorType: 'truck',
        BlockLot: 'A1',
        Status: 'approved',
        MenuItems: ['Burger', 'Fries'],
        Location: '(37.1234, -122.5678)',
        Address: '123 Main St',
        ExtendedInfoAddress: 'Suite 100',
        PrimaryKey: 'Primary Key',
        Latitude: '33.33',
        Longitude: '44.44',
        Permit: 'PERMIT000',
        Approved: 'DECLINED',
        Received: '2024-01-01',
        PriorPermit: '666',
        ExpirationDate: '2024-01-02',
    };

    it('renders the vendor card for a truck correctly', () => {
        const { container, getByText, debug, getByTestId, getAllByTestId } = render(<VendorCard vendor={vendor} />);

        // https://nodejs.org/api/debugger.html
        // https://jestjs.io/docs/troubleshooting
        // DEBUGGING tools
        // 
        // console.log(container.innerHTML);
        // const {  debug } = render(<VendorCard vendor={vendor} />);
        // debug();
        // console.log(prettyDOM());
        // console.log(prettyDOM(getByText('Food Truck')));

        // Business Name
        expect(getByText("Johnny's Food Truck")).toBeInTheDocument();

        // menu items
        expect(getByText('Burger')).toBeInTheDocument();
        expect(getByText('Fries')).toBeInTheDocument();

        // truck icon
        expect(getByTestId('LocalShippingIcon')).toBeInTheDocument();

        // address shown
        expect(getByText('123 Main St')).toBeInTheDocument();

        // block lot type address shown
        expect(getByText('Suite 100')).toBeInTheDocument();
        expect(container.innerHTML.includes('https://sfplanninggis.org/pim/?tab=Property&search=A1'));

        expect(container.innerHTML.includes('https://www.google.com/maps/search/?api=1&query=37.1234,-122.5678'));
        expect(getAllByTestId('PlaceIcon')).toHaveLength(2);

        // latitude and longitude not shown individually
        expect(!container.innerHTML.includes('33.33'));
        expect(!container.innerHTML.includes('44.44'));

        // Permit not shown
        expect(!container.innerHTML.includes('PERMIT000'));

        // Expiration not shown
        expect(!container.innerHTML.includes('2024-01-02'));

        // prior permit not shown
        expect(!container.innerHTML.includes('666'));

        // Primary Key not shown
        expect(!container.innerHTML.includes('Primary Key'));

        // Received not shown
        expect(!container.innerHTML.includes('2024-01-01'));

        // Approved shown
        expect(container.innerHTML.includes('Status: Permit approved'));

    });
});
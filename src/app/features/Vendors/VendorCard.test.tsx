import { render } from '@testing-library/react';
import VendorCard from './VendorCard';
import { VendorRecord } from '@/app/lib/VendorRecord';

describe('VendorCard', () => {
    const vendor: VendorRecord = {
        VendorType: 'truck',
        BlockLot: 'A1',
        Status: 'approved',
        MenuItems: ['Burger', 'Fries'],
        Location: '(37.1234, -122.5678)',
        Address: '123 Main St',
        ExtendedInfoAddress: 'Suite 100',
        BusinessName: 'Food Truck',
        PrimaryKey: '',
        Latitude: '',
        Longitude: '',
        Permit: '',
        Approved: '',
        Received: '',
        PriorPermit: '',
        ExpirationDate: ''
    };

    it('renders the vendor card correctly', () => {
        const { getByText, getByLabelText } = render(<VendorCard vendor={vendor} />);

        expect(getByText('Food Truck')).toBeInTheDocument();
        expect(getByText('Burger')).toBeInTheDocument();
        expect(getByText('Fries')).toBeInTheDocument();
        expect(getByLabelText('truck')).toBeInTheDocument();
        expect(getByLabelText('Place')).toBeInTheDocument();
        expect(getByLabelText('approved')).toBeInTheDocument();
    });
});
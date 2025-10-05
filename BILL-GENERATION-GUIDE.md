# Bill Generation System

This guide explains how to use the bill generation system for Hydrogenro Water Solutions.

## Features

- **Professional Bill Layout**: Clean, professional design with Hydrogenro branding
- **GST Compliance**: Automatic GST calculations and proper tax formatting
- **Customer Management**: Select customers from a searchable list
- **Item Management**: Add, edit, and remove bill items with automatic calculations
- **Print/Download**: Generate printable PDF bills
- **No Database Storage**: Bills are generated on-demand without storing in database

## How to Use

### 1. Access Bill Generation
- Navigate to `/bills` or click "Generate Bill" from the Admin Dashboard
- You'll see a list of customers with search functionality

### 2. Select a Customer
- Use the search bar to find customers by name, phone, email, or customer ID
- Click "Generate Bill" on the customer card

### 3. Generate the Bill
- Fill in bill details:
  - Bill number (auto-generated)
  - Bill date and due date
  - Payment status and method
- Add bill items:
  - Description, quantity, unit price
  - Tax rate (default 18% GST)
  - Automatic total calculations
- Add notes and terms if needed

### 4. Print/Download
- Click "Print/Download Bill" to generate a professional PDF
- The bill will open in a new window for printing or saving

## Bill Structure

### Company Information
- **Name**: Hydrogenro Water Solutions
- **Address**: 123 Main Street, Tech Park, Bangalore - 560001
- **Contact**: Phone, Email, Website
- **GST Number**: 29ABCDE1234F1Z5
- **PAN Number**: ABCDE1234F

### Customer Information
- Customer name, address, contact details
- GST number (if available)

### Bill Items
- Description of service/product
- Quantity and unit price
- Tax rate and tax amount
- Total amount per item

### Financial Summary
- Subtotal (before tax)
- Total tax amount
- Final total amount

## Technical Details

### Components
- `BillPage.tsx`: Main page with customer selection
- `BillGenerator.tsx`: Bill creation form
- `pdf-generator.ts`: PDF generation utility

### Key Features
- **Responsive Design**: Works on desktop and mobile
- **Real-time Calculations**: Automatic tax and total calculations
- **Professional Styling**: Clean, business-ready design
- **Print Optimization**: Optimized for printing and PDF generation

### Customization
- Company information can be updated in `BillGenerator.tsx`
- Default tax rates can be modified
- Styling can be customized in the CSS

## Sample Bill Items

The system comes with default items for common RO services:
- RO Water Purifier Installation: ₹15,000
- Filter Replacement: ₹2,500
- Maintenance Service: ₹1,500
- Emergency Repair: ₹3,000

## Notes
- Bills are not stored in the database - they are generated on-demand
- All calculations are done client-side
- The system is designed for immediate printing/downloading
- GST compliance is built-in with proper formatting

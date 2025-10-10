// PDF Generation utility for bills
// This is a simple implementation using browser's print functionality
// For production, consider using libraries like jsPDF or Puppeteer

export interface PDFBillData {
  billNumber: string;
  billDate: string;
  dueDate: string;
  company: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    email: string;
    gstNumber: string;
    panNumber: string;
    website?: string;
  };
  customer: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    email: string;
    gstNumber?: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    taxRate: number;
    taxAmount: number;
  }>;
  subtotal: number;
  serviceCharge?: number;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod?: string;
  notes?: string;
  terms?: string;
}

export function generateBillPDF(billData: PDFBillData): void {
  // Create a new window for printing
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  if (!printWindow) {
    alert('Please allow popups to print the bill');
    return;
  }

  // Generate the HTML content
  const htmlContent = generateBillHTML(billData);
  
  // Write the content to the new window
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      // Close the window after printing
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    }, 500);
  };
}

function generateBillHTML(data: PDFBillData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bill - ${data.billNumber}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
          margin: 0;
          padding: 0;
          width: 210mm; /* A4 width */
          min-height: 297mm; /* A4 height */
          max-width: 210mm; /* Fixed A4 width */
          padding: 20mm 15mm 20mm 15mm; /* Top, Right, Bottom, Left - A4 margins */
          box-sizing: border-box;
          overflow: visible;
        }
        
        .bill-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          background: white;
          padding: 0;
          overflow: visible;
          border: 2px solid #000;
          min-height: calc(297mm - 40mm); /* A4 height minus margins */
        }
        
        .header {
          text-align: center;
          margin-bottom: 20px;
          border-bottom: 2px solid #000000;
          padding: 20px 0 15px 0;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
        }
        
        .full-logo {
          max-width: 200px;
          height: auto;
          max-height: 60px;
        }
        
        .company-details {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }
        
        .bill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 20px;
          padding: 0 20px;
        }
        
        .bill-to, .bill-details {
          flex: 1;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 15px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 5px;
        }
        
        .customer-info, .bill-meta {
          font-size: 14px;
          line-height: 1.5;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 20px 20px 20px;
          font-size: 12px;
        }
        
        .items-table th {
          background-color: #f8fafc;
          color: #374151;
          font-weight: bold;
          padding: 12px 8px;
          text-align: center;
          border: 1px solid #d1d5db;
        }
        
        .items-table td {
          padding: 12px 8px;
          border: 1px solid #d1d5db;
          vertical-align: middle;
          text-align: center;
        }
        
        .items-table tr:nth-child(even) {
          background-color: #f9fafb;
        }
        
        .text-right {
          text-align: right;
        }
        
        .text-center {
          text-align: center;
        }
        
        .summary {
          margin: 20px 20px 0 20px;
          text-align: right;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .summary-row.total {
          font-size: 18px;
          font-weight: bold;
          color: #000000;
          border-top: 2px solid #000000;
          border-bottom: 2px solid #000000;
          margin-top: 10px;
          padding: 15px 0;
        }
        
        .notes-section {
          margin: 20px 20px 0 20px;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
        }
        
        .notes-title {
          font-size: 16px;
          font-weight: bold;
          color: #374151;
          margin-bottom: 10px;
        }
        
        .notes-content {
          font-size: 14px;
          line-height: 1.5;
          color: #6b7280;
        }
        
        .terms-list {
          margin: 0;
          padding-left: 20px;
        }
        
        .terms-list li {
          margin-bottom: 8px;
          list-style-type: disc;
        }
        
        
        .footer {
          margin: 20px 20px 0 20px;
          padding: 15px 0;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 11px;
          color: #6b7280;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .status-pending {
          background-color: #fef3c7;
          color: #d97706;
        }
        
        .status-paid {
          background-color: #d1fae5;
          color: #059669;
        }
        
        .status-overdue {
          background-color: #fee2e2;
          color: #dc2626;
        }
        
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            width: 210mm !important;
            min-height: 297mm !important;
            max-width: 210mm !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: 12pt !important;
            line-height: 1.4 !important;
          }
          
          .bill-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 2px solid #000 !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
          }
          
          @page {
            size: A4 !important;
            margin: 15mm !important;
          }
          
          .header {
            page-break-after: avoid !important;
          }
          
          .items-table {
            page-break-inside: avoid !important;
          }
          
          .summary {
            page-break-before: avoid !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="bill-container">
        <!-- Header -->
        <div class="header">
          <div class="logo-container">
            <img src="/fulllogo.webp" alt="Hydrogenro Logo" class="full-logo" />
          </div>
          <div class="company-details">
            <div>${data.company.address}, ${data.company.city} - ${data.company.pincode}</div>
            <div>Phone: ${data.company.phone} | Email: ${data.company.email}</div>
            <div>GST: ${data.company.gstNumber}</div>
            ${data.company.website ? `<div>Website: ${data.company.website}</div>` : ''}
          </div>
        </div>
        
        <!-- Bill Information -->
        <div class="bill-info">
          <div class="bill-to">
            <div class="section-title">Bill To:</div>
            <div class="customer-info">
              <div><strong>${data.customer.name}</strong></div>
              <div>${data.customer.address}</div>
              <div>${data.customer.city}, ${data.customer.state} - ${data.customer.pincode}</div>
              <div>Phone: ${data.customer.phone}</div>
              <div>Email: ${data.customer.email}</div>
              ${data.customer.gstNumber ? `<div>GST: ${data.customer.gstNumber}</div>` : ''}
            </div>
          </div>
          
          <div class="bill-details">
            <div class="section-title">Bill Details:</div>
            <div class="bill-meta">
              <div><strong>Bill Number:</strong> ${data.billNumber}</div>
              <div><strong>Bill Date:</strong> ${new Date(data.billDate).toLocaleDateString()}</div>
              <div><strong>Due Date:</strong> ${new Date(data.dueDate).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
        
        <!-- Items Table -->
        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>₹${item.unitPrice.toLocaleString()}</td>
                <td>₹${item.total.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <!-- Summary -->
        <div class="summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>₹${data.subtotal.toLocaleString()}</span>
          </div>
          ${data.serviceCharge && data.serviceCharge > 0 ? `
            <div class="summary-row">
              <span>Service Charge:</span>
              <span>₹${data.serviceCharge.toLocaleString()}</span>
            </div>
          ` : ''}
          <div class="summary-row total">
            <span>Total Amount:</span>
            <span>₹${data.totalAmount.toLocaleString()}</span>
          </div>
        </div>
        
        <!-- Notes and Terms -->
        ${data.notes || data.terms ? `
          <div class="notes-section">
            ${data.notes ? `
              <div class="notes-title">Notes:</div>
              <div class="notes-content">${data.notes}</div>
            ` : ''}
            ${data.terms ? `
              <div class="notes-title" style="margin-top: 20px;">Terms & Conditions:</div>
              <div class="notes-content">
                <ul class="terms-list">
                  <li>Goods once sold will not be taken back and refund or exchange.</li>
                  <li>There is 60 Days warranty for RO & PUMP. No Warranty for other spare parts.</li>
                  <li>Without the bill there will not be any warranty / free service given.</li>
                  <li>There is no warranty on the water purifier used for more than 750 PPM water TDS level.</li>
                  <li>Once the order placed cannot be cancelled and advance amount will not be returned.</li>
                  <li>Charges of Rs. 500/- extra to be paid on collection of the cash against cheque return.</li>
                  <li>Company is not responsible for any transactions done personally with the technicians.</li>
                </ul>
              </div>
            ` : ''}
          </div>
        ` : ''}
        
        <!-- Footer -->
        <div class="footer">
          <p>Thank you for choosing Hydrogenro!</p>
          <p>For any queries, contact us at ${data.company.phone} or ${data.company.email}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

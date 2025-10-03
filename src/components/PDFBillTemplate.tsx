import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { LOGO_DATA_URL } from './LogoData';

// Register fonts for better text rendering
Font.register({
  family: 'Helvetica',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/fonts/Helvetica.woff2',
});

Font.register({
  family: 'Helvetica-Bold',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/fonts/Helvetica-Bold.woff2',
});

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoIcon: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  logoShape: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  logoImage: {
    width: 24,
    height: 24,
    objectFit: 'contain',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  companyInfo: {
    alignItems: 'center',
  },
  companyTagline: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  companyDetails: {
    fontSize: 10,
    color: '#6b7280',
    lineHeight: 1.4,
  },
  billInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  billDetails: {
    flex: 1,
  },
  billTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  billInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  billInfoLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    width: 80,
  },
  billInfoValue: {
    fontSize: 12,
    color: '#6b7280',
  },
  customerInfo: {
    flex: 1,
    marginLeft: 20,
  },
  customerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  customerDetails: {
    fontSize: 11,
    color: '#6b7280',
    lineHeight: 1.5,
  },
  table: {
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 8,
  },
  tableCell: {
    fontSize: 10,
    paddingHorizontal: 8,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    paddingHorizontal: 8,
  },
  colDescription: {
    width: '40%',
  },
  colQty: {
    width: '15%',
    textAlign: 'center',
  },
  colRate: {
    width: '20%',
    textAlign: 'right',
  },
  colAmount: {
    width: '25%',
    textAlign: 'right',
  },
  totals: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#2563eb',
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  statusBox: {
    backgroundColor: '#f0f9ff',
    borderWidth: 1,
    borderColor: '#0ea5e9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0c4a6e',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 1.4,
  },
  footerTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 5,
  },
});

interface BillItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface BillData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  jobNumber: string;
  status: string;
  date: string;
}

interface PDFBillTemplateProps {
  billData: BillData;
  billItems: BillItem[];
  taxRate: number;
}

const PDFBillTemplate: React.FC<PDFBillTemplateProps> = ({ billData, billItems, taxRate }) => {
  const subtotal = billItems.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal;

  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image src={LOGO_DATA_URL} style={styles.logoImage} />
            </View>
            <View>
              <Text style={styles.logo}>Hydrogen RO</Text>
            </View>
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.companyDetails}>
              Bengaluru, Karnataka, India{'\n'}
              Phone: +91-9876543210{'\n'}
              Email: info@hydrogenro.com{'\n'}
              Website: www.hydrogenro.com
            </Text>
          </View>
        </View>

        {/* Bill Information */}
        <View style={styles.billInfo}>
          <View style={styles.billDetails}>
            <Text style={styles.billTitle}>INVOICE</Text>
            <View style={styles.billInfoRow}>
              <Text style={styles.billInfoLabel}>Invoice #:</Text>
              <Text style={styles.billInfoValue}>{billData.jobNumber}</Text>
            </View>
            <View style={styles.billInfoRow}>
              <Text style={styles.billInfoLabel}>Date:</Text>
              <Text style={styles.billInfoValue}>{formatDate(billData.date)}</Text>
            </View>
            <View style={styles.billInfoRow}>
              <Text style={styles.billInfoLabel}>Service:</Text>
              <Text style={styles.billInfoValue}>{billData.serviceType}</Text>
            </View>
          </View>

          <View style={styles.customerInfo}>
            <Text style={styles.customerTitle}>Bill To:</Text>
            <View style={styles.customerDetails}>
              <Text>{billData.customerName}</Text>
              <Text>{billData.customerEmail}</Text>
              <Text>{billData.customerPhone}</Text>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCellHeader, styles.colDescription]}>Description</Text>
            <Text style={[styles.tableCellHeader, styles.colQty]}>Qty</Text>
            <Text style={[styles.tableCellHeader, styles.colRate]}>Rate (Rs.)</Text>
            <Text style={[styles.tableCellHeader, styles.colAmount]}>Amount (Rs.)</Text>
          </View>
          
          {billItems.map((item, index) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colDescription]}>{item.description}</Text>
              <Text style={[styles.tableCell, styles.colQty]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, styles.colRate]}>{formatCurrency(item.rate)}</Text>
              <Text style={[styles.tableCell, styles.colAmount]}>{formatCurrency(item.amount)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>Total:</Text>
            <Text style={styles.grandTotalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>


        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Thank you for choosing Hydrogen RO!</Text>
          <Text style={styles.footerText}>
            For any queries regarding this invoice, please contact us at info@hydrogenro.com{'\n'}
            or call us at +91-9876543210. We appreciate your business!
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFBillTemplate;

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, FileText, Droplets, Plus, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { pdf } from '@react-pdf/renderer';
import PDFBillTemplate from './PDFBillTemplate';

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
  amount: number;
  status: string;
  orderId?: string;
  paymentId?: string;
  date?: string;
}

interface BillGeneratorProps {
  billData: BillData;
  onGenerate?: () => void;
}

const BillGenerator: React.FC<BillGeneratorProps> = ({ billData, onGenerate }) => {
  const billRef = useRef<HTMLDivElement>(null);
  const [billItems, setBillItems] = useState<BillItem[]>([
    {
      id: '1',
      description: 'RO Service Installation',
      quantity: 1,
      rate: 15000,
      amount: 15000
    }
  ]);
  const [taxRate, setTaxRate] = useState(18); // 18% GST
  const [showPreview, setShowPreview] = useState(false);

  // Calculate totals
  const subtotal = billItems.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal;


  // Item management functions
  const addItem = () => {
    const newItem: BillItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setBillItems([...billItems, newItem]);
  };

  const removeItem = (id: string) => {
    if (billItems.length > 1) {
      setBillItems(billItems.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof BillItem, value: string | number) => {
    setBillItems(billItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const generatePreview = () => {
    setShowPreview(true);
  };

  const generatePDF = async () => {
    try {
      toast.loading('Generating PDF bill...', { id: 'pdf-generation' });

      // Create PDF using React-PDF
      const blob = await pdf(
        <PDFBillTemplate 
          billData={billData} 
          billItems={billItems} 
          taxRate={taxRate} 
        />
      ).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `HydrogenRO_Bill_${billData.jobNumber}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('PDF bill generated successfully!', { id: 'pdf-generation' });
      
      if (onGenerate) {
        onGenerate();
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(`Failed to generate PDF bill: ${error instanceof Error ? error.message : 'Unknown error'}`, { id: 'pdf-generation' });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleDateString('en-IN');
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const formatCurrency = (amount: number) => {
    // Use "Rs." instead of "₹" to avoid encoding issues
    return `Rs. ${amount.toLocaleString('en-IN')}`;
  };

  // HTML Preview Component that matches PDF layout
  const HTMLPreview = () => (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="flex flex-col items-center mb-8 pb-4 border-b-2 border-black">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">Hydrogen RO</h1>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600 leading-relaxed">
            Bengaluru, Karnataka, India<br />
            Phone: +91-9876543210<br />
            Email: info@hydrogenro.com<br />
            Website: www.hydrogenro.com
          </p>
        </div>
      </div>

      {/* Invoice Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">INVOICE</h1>
      </div>

      {/* Bill Information */}
      <div className="flex justify-between mb-8">
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-sm font-bold text-gray-700">Invoice #:</span>
            <span className="text-sm text-gray-600 ml-2">{billData.jobNumber}</span>
          </div>
          <div className="mb-2">
            <span className="text-sm font-bold text-gray-700">Date:</span>
            <span className="text-sm text-gray-600 ml-2">{formatDate(billData.date)}</span>
          </div>
          <div className="mb-2">
            <span className="text-sm font-bold text-gray-700">Service:</span>
            <span className="text-sm text-gray-600 ml-2">{billData.serviceType}</span>
          </div>
        </div>

        <div className="flex-1 ml-8">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Bill To:</h3>
          <div className="text-sm text-gray-600">
            <p>{billData.customerName}</p>
            <p>{billData.customerEmail}</p>
            <p>{billData.customerPhone}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left text-xs font-bold text-gray-700 w-2/5">Description</th>
              <th className="border border-gray-300 px-3 py-2 text-center text-xs font-bold text-gray-700 w-1/6">Qty</th>
              <th className="border border-gray-300 px-3 py-2 text-right text-xs font-bold text-gray-700 w-1/5">Rate (Rs.)</th>
              <th className="border border-gray-300 px-3 py-2 text-right text-xs font-bold text-gray-700 w-1/5">Amount (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {billItems.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 px-3 py-2 text-xs text-gray-800">{item.description}</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-xs text-gray-600">{item.quantity}</td>
                <td className="border border-gray-300 px-3 py-2 text-right text-xs text-gray-600">{formatCurrency(item.rate)}</td>
                <td className="border border-gray-300 px-3 py-2 text-right text-xs font-bold text-gray-800">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="border-t-2 border-black pt-2 flex justify-between">
            <span className="text-sm font-bold text-gray-800">Total:</span>
            <span className="text-sm font-bold text-black">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>


      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t pt-4">
        <p className="font-bold mb-2">Thank you for choosing Hydrogen RO!</p>
        <p className="mb-1">
          For any queries regarding this invoice, please contact us at info@hydrogenro.com
        </p>
        <p>or call us at +91-9876543210. We appreciate your business!</p>
      </div>
    </div>
  );


  return (
    <div className="space-y-4">
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <FileText className="w-5 h-5" />
            Generate Bill
          </CardTitle>
          <p className="text-blue-700 text-sm">
            Add items and generate a professional PDF bill
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Item Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">Bill Items</h4>
              <Button
                onClick={addItem}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-3">
              {billItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center p-3 bg-white rounded-lg border">
                  <div className="col-span-5">
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description"
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      placeholder="Qty"
                      className="text-sm text-center"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', parseInt(e.target.value) || 0)}
                      placeholder="Rate"
                      className="text-sm text-right"
                    />
                  </div>
                  <div className="col-span-2 text-right font-medium text-gray-700">
                    {formatCurrency(item.amount)}
                  </div>
                  <div className="col-span-1">
                    {billItems.length > 1 && (
                      <Button
                        onClick={() => removeItem(item.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Totals Summary */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-lg font-bold text-black border-t pt-2">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={showPreview ? () => setShowPreview(false) : generatePreview}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Hide Preview' : 'Preview Bill'}
            </Button>
            <Button
              onClick={generatePDF}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bill Preview */}
      {showPreview && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Eye className="w-5 h-5" />
              Bill Preview
            </CardTitle>
            <p className="text-green-700 text-sm">
              This is exactly how your PDF will look
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 border rounded-lg overflow-auto max-h-96">
              <HTMLPreview />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BillGenerator;

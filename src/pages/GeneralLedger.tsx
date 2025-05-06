
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import NewJournalEntryForm from '@/components/journal/NewJournalEntryForm';
import { BookOpen } from 'lucide-react'; // Using BookOpen instead of Journal

const GeneralLedger: React.FC = () => {
  const { toast } = useToast();
  const [isJournalEntryDialogOpen, setIsJournalEntryDialogOpen] = useState(false);
  
  // Mock data
  const [ledgerEntries, setLedgerEntries] = useState([
    { 
      id: 1, 
      date: '2025-05-01', 
      reference: 'INV-1001', 
      account: 'Accounts Receivable', 
      description: 'Client Invoice - XYZ Inc', 
      debit: 5000, 
      credit: 0 
    },
    { 
      id: 2, 
      date: '2025-05-01', 
      reference: 'INV-1001', 
      account: 'Sales Revenue', 
      description: 'Client Invoice - XYZ Inc', 
      debit: 0, 
      credit: 5000 
    },
    { 
      id: 3, 
      date: '2025-05-02', 
      reference: 'EXP-101', 
      account: 'Office Supplies', 
      description: 'Monthly Office Supplies', 
      debit: 750, 
      credit: 0 
    },
    { 
      id: 4, 
      date: '2025-05-02', 
      reference: 'EXP-101', 
      account: 'Cash', 
      description: 'Monthly Office Supplies', 
      debit: 0, 
      credit: 750 
    },
    { 
      id: 5, 
      date: '2025-05-03', 
      reference: 'PAY-203', 
      account: 'Cash', 
      description: 'Client Payment - ABC Corp', 
      debit: 7500, 
      credit: 0 
    },
    { 
      id: 6, 
      date: '2025-05-03', 
      reference: 'PAY-203', 
      account: 'Accounts Receivable', 
      description: 'Client Payment - ABC Corp', 
      debit: 0, 
      credit: 7500 
    },
  ]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  const handleJournalEntrySubmit = (data: any) => {
    let nextId = ledgerEntries.length + 1;
    const newEntries = data.lines.map((line: any) => {
      return {
        id: nextId++,
        date: data.date,
        reference: data.reference,
        account: line.account,
        description: data.description,
        debit: line.debit ? parseFloat(line.debit) : 0,
        credit: line.credit ? parseFloat(line.credit) : 0
      };
    });
    
    setLedgerEntries([...newEntries, ...ledgerEntries]);
    setIsJournalEntryDialogOpen(false);
    
    toast({
      title: "Journal Entry Created",
      description: `Journal entry ${data.reference} has been added to the general ledger.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dac-foreground">General Ledger</h2>
        <Button 
          variant="default" 
          className="bg-dac-primary hover:bg-dac-secondary"
          onClick={() => setIsJournalEntryDialogOpen(true)}
        >
          <BookOpen className="h-4 w-4 mr-2" /> New Journal Entry
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">From Date</label>
              <Input type="date" defaultValue="2025-05-01" className="bg-white" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">To Date</label>
              <Input type="date" defaultValue="2025-05-31" className="bg-white" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Account</label>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="All Accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="accounts-receivable">Accounts Receivable</SelectItem>
                  <SelectItem value="accounts-payable">Accounts Payable</SelectItem>
                  <SelectItem value="sales-revenue">Sales Revenue</SelectItem>
                  <SelectItem value="office-supplies">Office Supplies</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Reference</label>
              <Input type="text" placeholder="Enter reference number" className="bg-white" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="mr-2">Reset</Button>
            <Button variant="default" className="bg-dac-primary hover:bg-dac-secondary">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dac-background border-b border-dac-border">
                  <th className="px-4 py-3 text-left text-sm font-medium text-dac-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dac-foreground">Reference</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dac-foreground">Account</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dac-foreground">Description</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-dac-foreground">Debit</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-dac-foreground">Credit</th>
                </tr>
              </thead>
              <tbody>
                {ledgerEntries.map(entry => (
                  <tr key={entry.id} className="border-b border-dac-border hover:bg-dac-background">
                    <td className="px-4 py-3 text-sm">{entry.date}</td>
                    <td className="px-4 py-3 text-sm">{entry.reference}</td>
                    <td className="px-4 py-3 text-sm">{entry.account}</td>
                    <td className="px-4 py-3 text-sm">{entry.description}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      {entry.debit > 0 ? formatCurrency(entry.debit) : ''}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      {entry.credit > 0 ? formatCurrency(entry.credit) : ''}
                    </td>
                  </tr>
                ))}
                <tr className="bg-dac-background">
                  <td colSpan={4} className="px-4 py-3 text-sm font-medium text-right">Total</td>
                  <td className="px-4 py-3 text-sm font-medium text-right">
                    {formatCurrency(ledgerEntries.reduce((sum, entry) => sum + entry.debit, 0))}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-right">
                    {formatCurrency(ledgerEntries.reduce((sum, entry) => sum + entry.credit, 0))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <NewJournalEntryForm 
        open={isJournalEntryDialogOpen}
        onOpenChange={setIsJournalEntryDialogOpen}
        onSubmit={handleJournalEntrySubmit}
      />
    </div>
  );
};

export default GeneralLedger;

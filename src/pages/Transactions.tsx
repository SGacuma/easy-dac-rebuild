
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewTransactionForm from '@/components/transactions/NewTransactionForm';
import { FilePlus } from 'lucide-react';

const Transactions: React.FC = () => {
  const { toast } = useToast();
  const [isNewTransactionDialogOpen, setIsNewTransactionDialogOpen] = useState(false);
  
  // Mock data
  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      date: '2025-05-05', 
      type: 'Invoice', 
      reference: 'INV-1002', 
      customer: 'XYZ Corporation', 
      status: 'Pending', 
      amount: 3500 
    },
    { 
      id: 2, 
      date: '2025-05-04', 
      type: 'Payment', 
      reference: 'PAY-1001', 
      customer: 'ABC Inc', 
      status: 'Completed', 
      amount: 7500 
    },
    { 
      id: 3, 
      date: '2025-05-03', 
      type: 'Expense', 
      reference: 'EXP-102', 
      customer: 'Office Depot', 
      status: 'Completed', 
      amount: -1250 
    },
    { 
      id: 4, 
      date: '2025-05-03', 
      type: 'Invoice', 
      reference: 'INV-1001', 
      customer: 'XYZ Corporation', 
      status: 'Paid', 
      amount: 5000 
    },
    { 
      id: 5, 
      date: '2025-05-02', 
      type: 'Expense', 
      reference: 'EXP-101', 
      customer: 'Office Utilities', 
      status: 'Completed', 
      amount: -350 
    },
    { 
      id: 6, 
      date: '2025-05-01', 
      type: 'Payment', 
      reference: 'PAY-1000', 
      customer: 'DEF Ltd', 
      status: 'Completed', 
      amount: 4200 
    },
  ]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'paid':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  const handleNewTransactionSubmit = (data: any) => {
    const newTransaction = {
      id: transactions.length + 1,
      date: data.date,
      type: data.type,
      reference: data.reference,
      customer: data.customer,
      status: data.status,
      amount: data.type === 'Expense' ? -parseFloat(data.amount) : parseFloat(data.amount)
    };
    
    setTransactions([newTransaction, ...transactions]);
    setIsNewTransactionDialogOpen(false);
    
    toast({
      title: "Transaction Created",
      description: `${data.type} ${data.reference} has been created successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dac-foreground">Transactions</h2>
        <div className="flex space-x-2">
          <Button variant="outline">Import Transactions</Button>
          <Button 
            variant="default" 
            className="bg-dac-primary hover:bg-dac-secondary"
            onClick={() => setIsNewTransactionDialogOpen(true)}
          >
            <FilePlus className="h-4 w-4 mr-2" /> New Transaction
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Transaction Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="transfers">Transfers</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
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
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Search</label>
                  <Input type="text" placeholder="Search transactions" className="bg-white" />
                </div>
              </div>
            </TabsContent>
            
            {/* Other tabs would have similar content but filtered by type */}
            <TabsContent value="invoices">
              <p className="text-sm text-dac-muted">Filtered view of invoices would appear here.</p>
            </TabsContent>
            <TabsContent value="payments">
              <p className="text-sm text-dac-muted">Filtered view of payments would appear here.</p>
            </TabsContent>
            <TabsContent value="expenses">
              <p className="text-sm text-dac-muted">Filtered view of expenses would appear here.</p>
            </TabsContent>
            <TabsContent value="transfers">
              <p className="text-sm text-dac-muted">Filtered view of transfers would appear here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="bg-dac-background border-b border-dac-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-dac-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-dac-foreground">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-dac-foreground">Reference</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-dac-foreground">Customer/Vendor</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-dac-foreground">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-dac-foreground">Amount</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-dac-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className="border-b border-dac-border hover:bg-dac-background">
                  <td className="px-4 py-3 text-sm">{transaction.date}</td>
                  <td className="px-4 py-3 text-sm">{transaction.type}</td>
                  <td className="px-4 py-3 text-sm">{transaction.reference}</td>
                  <td className="px-4 py-3 text-sm">{transaction.customer}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-sm text-right ${transaction.amount >= 0 ? 'text-dac-foreground' : 'text-red-500'}`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">View</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                      <span className="sr-only">Edit</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                        <path d="m15 5 4 4"></path>
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-dac-border px-4 py-2 bg-dac-background">
            <div className="text-sm text-dac-muted">
              Showing <strong>{transactions.length}</strong> of <strong>24</strong> transactions
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <NewTransactionForm 
        open={isNewTransactionDialogOpen}
        onOpenChange={setIsNewTransactionDialogOpen}
        onSubmit={handleNewTransactionSubmit}
      />
    </div>
  );
};

export default Transactions;

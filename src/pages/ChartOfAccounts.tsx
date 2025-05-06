import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { BadgePlus } from 'lucide-react';
import NewAccountForm from '@/components/accounts/NewAccountForm';

const ChartOfAccounts: React.FC = () => {
  const { toast } = useToast();
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false);
  
  // Mock data
  const [accounts, setAccounts] = useState([
    { id: 1, code: '1000', name: 'Cash', type: 'Asset', balance: 45000, active: true },
    { id: 2, code: '1100', name: 'Accounts Receivable', type: 'Asset', balance: 35000, active: true },
    { id: 3, code: '1200', name: 'Inventory', type: 'Asset', balance: 22000, active: true },
    { id: 4, code: '1500', name: 'Office Equipment', type: 'Asset', balance: 15000, active: true },
    { id: 5, code: '2000', name: 'Accounts Payable', type: 'Liability', balance: 22000, active: true },
    { id: 6, code: '2100', name: 'Accrued Expenses', type: 'Liability', balance: 5500, active: true },
    { id: 7, code: '3000', name: 'Common Stock', type: 'Equity', balance: 50000, active: true },
    { id: 8, code: '3100', name: 'Retained Earnings', type: 'Equity', balance: 35000, active: true },
    { id: 9, code: '4000', name: 'Sales Revenue', type: 'Revenue', balance: 125000, active: true },
    { id: 10, code: '5000', name: 'Cost of Goods Sold', type: 'Expense', balance: 62500, active: true },
    { id: 11, code: '6000', name: 'Office Supplies', type: 'Expense', balance: 3500, active: true },
    { id: 12, code: '6100', name: 'Rent Expense', type: 'Expense', balance: 12000, active: true },
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
  
  const handleNewAccountSubmit = (data: any) => {
    const newAccount = {
      id: accounts.length + 1,
      code: data.code,
      name: data.name,
      type: data.type,
      balance: parseFloat(data.balance),
      active: data.active
    };
    
    setAccounts([...accounts, newAccount]);
    setIsNewAccountDialogOpen(false);
    
    toast({
      title: "Account Created",
      description: `${data.name} has been added to the chart of accounts.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dac-foreground">Chart of Accounts</h2>
        <Button 
          variant="default" 
          className="bg-dac-primary hover:bg-dac-secondary"
          onClick={() => setIsNewAccountDialogOpen(true)}
        >
          <BadgePlus className="h-4 w-4 mr-2" /> Add New Account
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Account Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input type="text" placeholder="Search by name or code" className="bg-white" />
            <select className="w-full p-2 border rounded-md border-dac-border">
              <option value="all">All Account Types</option>
              <option value="asset">Asset</option>
              <option value="liability">Liability</option>
              <option value="equity">Equity</option>
              <option value="revenue">Revenue</option>
              <option value="expense">Expense</option>
            </select>
            <select className="w-full p-2 border rounded-md border-dac-border">
              <option value="all">All Accounts</option>
              <option value="active">Active Accounts</option>
              <option value="inactive">Inactive Accounts</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="w-[100px] text-center">Status</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map(account => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.code}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.type}</TableCell>
                  <TableCell className="text-right">{formatCurrency(account.balance)}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${account.active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {account.active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Edit</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                        <path d="m15 5 4 4"></path>
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t border-dac-border px-4 py-2 bg-dac-background">
            <div className="text-sm text-dac-muted">
              Showing <strong>{accounts.length}</strong> of <strong>{accounts.length}</strong> accounts
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <NewAccountForm 
        open={isNewAccountDialogOpen}
        onOpenChange={setIsNewAccountDialogOpen}
        onSubmit={handleNewAccountSubmit}
      />
    </div>
  );
};

export default ChartOfAccounts;

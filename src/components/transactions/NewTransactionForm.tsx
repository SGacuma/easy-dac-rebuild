
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateJournalLinesFromProforma } from '@/utils/proformaEntries';
import { Save } from 'lucide-react';

const transactionSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  type: z.string().min(1, 'Transaction type is required'),
  reference: z.string().min(1, 'Reference number is required'),
  customer: z.string().min(1, 'Customer/Vendor name is required'),
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  description: z.string().optional(),
  status: z.string().default('Pending'),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface NewTransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TransactionFormValues) => void;
}

const NewTransactionForm: React.FC<NewTransactionFormProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const [activeTab, setActiveTab] = useState('invoice');
  const [showJournalPreview, setShowJournalPreview] = useState(false);
  const [journalPreview, setJournalPreview] = useState<Array<{account: string; description: string; debit: string; credit: string}>>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      type: '',
      reference: '',
      customer: '',
      amount: 0,
      description: '',
      status: 'Pending'
    }
  });

  // Update journal preview when amount changes
  useEffect(() => {
    const amount = form.watch('amount');
    if (!amount) return;
    
    let proformaType = '';
    
    switch(activeTab) {
      case 'invoice':
        proformaType = 'sales';
        break;
      case 'payment':
        proformaType = 'payment';
        break;
      case 'expense':
        proformaType = 'purchase';
        break;
      case 'transfer':
        proformaType = 'vendor-payment';
        break;
    }
    
    if (proformaType) {
      const lines = generateJournalLinesFromProforma(proformaType, amount);
      setJournalPreview(lines);
    }
  }, [form.watch('amount'), activeTab]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Set the transaction type based on the tab
    form.setValue('type', value.charAt(0).toUpperCase() + value.slice(1));
  };

  const handleSubmit = async (data: TransactionFormValues) => {
    setIsSaving(true);
    try {
      await onSubmit(data);
      form.reset();
      setShowJournalPreview(false);
    } catch (error) {
      console.error("Error saving transaction:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="invoice" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="invoice">Invoice</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
              <TabsContent value="invoice">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice #</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. INV-1003" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Invoice description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <input type="hidden" {...form.register('type')} value="Invoice" />
              </TabsContent>
              
              <TabsContent value="payment">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment #</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. PAY-1003" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Payment description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <input type="hidden" {...form.register('type')} value="Payment" />
              </TabsContent>
              
              <TabsContent value="expense">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expense Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expense #</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. EXP-1003" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter vendor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Expense description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <input type="hidden" {...form.register('type')} value="Expense" />
              </TabsContent>
              
              <TabsContent value="transfer">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transfer Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transfer #</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. TRF-1003" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From/To Account</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account information" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Transfer description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <input type="hidden" {...form.register('type')} value="Transfer" />
              </TabsContent>
              
              {/* Journal Entry Preview */}
              {form.watch('amount') > 0 && (
                <div className="border rounded-md p-3 bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Journal Entry Preview</h3>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowJournalPreview(!showJournalPreview)}
                    >
                      {showJournalPreview ? 'Hide' : 'Show'} Journal Entries
                    </Button>
                  </div>
                  
                  {showJournalPreview && journalPreview.length > 0 && (
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="text-left py-1 px-2">Account</th>
                            <th className="text-left py-1 px-2">Description</th>
                            <th className="text-right py-1 px-2">Debit</th>
                            <th className="text-right py-1 px-2">Credit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {journalPreview.map((line, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="py-1 px-2">{line.account}</td>
                              <td className="py-1 px-2">{line.description}</td>
                              <td className="py-1 px-2 text-right">{line.debit}</td>
                              <td className="py-1 px-2 text-right">{line.credit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Transaction'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NewTransactionForm;

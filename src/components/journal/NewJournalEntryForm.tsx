
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { X, Plus } from 'lucide-react';
import { proformaEntries, generateJournalLinesFromProforma } from '@/utils/proformaEntries';

// Schema for the form with proper types
const journalEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  reference: z.string().min(1, 'Reference number is required'),
  description: z.string().min(1, 'Description is required'),
  lines: z.array(z.object({
    account: z.string().min(1, 'Account is required'),
    description: z.string().optional(),
    debit: z.string().optional(),
    credit: z.string().optional()
  })).refine(lines => 
    lines.length >= 2, {
      message: 'At least two lines are required'
    }
  ).refine(lines => {
    const totalDebit = lines.reduce((sum, line) => sum + (line.debit ? parseFloat(line.debit) : 0), 0);
    const totalCredit = lines.reduce((sum, line) => sum + (line.credit ? parseFloat(line.credit) : 0), 0);
    return Math.abs(totalDebit - totalCredit) < 0.001; // Accounting for floating point precision
  }, {
    message: 'Total debits must equal total credits'
  })
});

type JournalEntryValues = z.infer<typeof journalEntrySchema>;

// Mock list of accounts
const accountOptions = [
  { label: "Cash", value: "Cash" },
  { label: "Accounts Receivable", value: "Accounts Receivable" },
  { label: "Accounts Payable", value: "Accounts Payable" },
  { label: "Sales Revenue", value: "Sales Revenue" },
  { label: "Office Supplies", value: "Office Supplies" },
  { label: "Rent Expense", value: "Rent Expense" },
  { label: "Salary Expense", value: "Salary Expense" },
];

interface NewJournalEntryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: JournalEntryValues) => void;
}

const NewJournalEntryForm: React.FC<NewJournalEntryFormProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const [selectedProforma, setSelectedProforma] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  
  const form = useForm<JournalEntryValues>({
    resolver: zodResolver(journalEntrySchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      reference: '',
      description: '',
      lines: [
        { account: '', description: '', debit: '', credit: '' },
        { account: '', description: '', debit: '', credit: '' }
      ]
    }
  });
  
  // Use useFieldArray to handle dynamic form arrays
  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "lines"
  });
  
  // Calculate totals
  const calculateTotals = () => {
    const lines = form.getValues('lines');
    const totalDebit = lines.reduce((sum, line) => sum + (line.debit ? parseFloat(line.debit) : 0), 0);
    const totalCredit = lines.reduce((sum, line) => sum + (line.credit ? parseFloat(line.credit) : 0), 0);
    return { totalDebit, totalCredit };
  };
  
  const { totalDebit, totalCredit } = calculateTotals();

  // Add a new journal line
  const addLine = () => {
    append({ account: '', description: '', debit: '', credit: '' });
  };
  
  // Remove a journal line
  const removeLine = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    }
  };

  // Apply proforma template
  const applyProforma = () => {
    if (!selectedProforma || !transactionAmount || isNaN(parseFloat(transactionAmount))) {
      return;
    }

    const amount = parseFloat(transactionAmount);
    const selectedTemplate = proformaEntries.find(entry => entry.id === selectedProforma);
    
    if (!selectedTemplate) return;
    
    // Update description based on template
    form.setValue('description', selectedTemplate.description);
    
    // Generate journal lines based on the template and amount
    const generatedLines = generateJournalLinesFromProforma(selectedProforma, amount);
    
    // Replace the current lines with the generated ones
    replace(generatedLines);
  };

  const handleSubmit = (data: JournalEntryValues) => {
    onSubmit(data);
    form.reset();
    setSelectedProforma('');
    setTransactionAmount('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Journal Entry</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
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
                    <FormLabel>Reference #</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. JE-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Proforma Selection Section */}
            <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
              <h3 className="text-sm font-medium mb-2">Use Proforma Template</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Transaction Type</label>
                  <Select
                    value={selectedProforma}
                    onValueChange={setSelectedProforma}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {proformaEntries.map(entry => (
                        <SelectItem key={entry.id} value={entry.id}>
                          {entry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Amount</label>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="Enter amount" 
                    value={transactionAmount} 
                    onChange={(e) => setTransactionAmount(e.target.value)}
                  />
                </div>
                
                <div className="flex items-end">
                  <Button 
                    type="button" 
                    onClick={applyProforma}
                    disabled={!selectedProforma || !transactionAmount || isNaN(parseFloat(transactionAmount))}
                    className="w-full"
                  >
                    Apply Template
                  </Button>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Entry description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="font-medium">Journal Lines</div>
              
              <div className="grid grid-cols-12 gap-2 bg-muted p-2 rounded-md">
                <div className="col-span-3 font-medium text-sm">Account</div>
                <div className="col-span-3 font-medium text-sm">Description</div>
                <div className="col-span-2 font-medium text-sm">Debit</div>
                <div className="col-span-2 font-medium text-sm">Credit</div>
                <div className="col-span-2 font-medium text-sm">Action</div>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name={`lines.${index}.account`}
                      render={({ field }) => (
                        <Select 
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {accountOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name={`lines.${index}.description`}
                      render={({ field }) => (
                        <Input placeholder="Line description" {...field} />
                      )}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name={`lines.${index}.debit`}
                      render={({ field }) => (
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e);
                            if (e.target.value) {
                              form.setValue(`lines.${index}.credit`, '');
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name={`lines.${index}.credit`}
                      render={({ field }) => (
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (e.target.value) {
                              form.setValue(`lines.${index}.debit`, '');
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLine(index)}
                      disabled={fields.length <= 2}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-12 gap-2 pt-2 border-t mt-2">
                <div className="col-span-6 text-right font-medium">Totals:</div>
                <div className="col-span-2 font-medium">{totalDebit.toFixed(2)}</div>
                <div className="col-span-2 font-medium">{totalCredit.toFixed(2)}</div>
                <div className="col-span-2"></div>
              </div>

              <div className={`text-right font-medium ${Math.abs(totalDebit - totalCredit) < 0.001 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(totalDebit - totalCredit) < 0.001 ? 'Balanced' : 'Unbalanced'}
              </div>
              
              <Button
                type="button" 
                variant="outline" 
                onClick={addLine}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Line
              </Button>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={Math.abs(totalDebit - totalCredit) > 0.001}
              >
                Save Journal Entry
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewJournalEntryForm;

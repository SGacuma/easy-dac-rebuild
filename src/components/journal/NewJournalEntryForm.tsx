
import React, { useState } from 'react';
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
import { X, Plus } from 'lucide-react';

// Schema for the form
const journalEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  reference: z.string().min(1, 'Reference number is required'),
  description: z.string().min(1, 'Description is required'),
  lines: z.array(z.object({
    account: z.string().min(1, 'Account is required'),
    description: z.string().optional(),
    debit: z.string().transform(val => parseFloat(val) || 0),
    credit: z.string().transform(val => parseFloat(val) || 0)
  })).refine(lines => 
    lines.length >= 2, {
      message: 'At least two lines are required'
    }
  ).refine(lines => {
    const totalDebit = lines.reduce((sum, line) => sum + (Number(line.debit) || 0), 0);
    const totalCredit = lines.reduce((sum, line) => sum + (Number(line.credit) || 0), 0);
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
  
  const { fields, append, remove } = form.watch('lines');
  
  // Calculate totals
  const calculateTotals = () => {
    const lines = form.getValues('lines');
    const totalDebit = lines.reduce((sum, line) => sum + (Number(line.debit) || 0), 0);
    const totalCredit = lines.reduce((sum, line) => sum + (Number(line.credit) || 0), 0);
    return { totalDebit, totalCredit };
  };
  
  const { totalDebit, totalCredit } = calculateTotals();

  // Add a new journal line
  const addLine = () => {
    const lines = form.getValues('lines');
    form.setValue('lines', [...lines, { account: '', description: '', debit: '', credit: '' }]);
  };
  
  // Remove a journal line
  const removeLine = (index: number) => {
    const lines = form.getValues('lines');
    if (lines.length > 2) {
      form.setValue('lines', lines.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (data: JournalEntryValues) => {
    onSubmit(data);
    form.reset();
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

              {form.getValues('lines').map((line, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
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
                      disabled={form.getValues('lines').length <= 2}
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


// Predefined proforma entry templates for common accounting transactions
export interface ProformaEntry {
  id: string;
  name: string;
  description: string;
  lines: {
    account: string;
    description: string;
    isDebit: boolean;
    percentage?: number; // Optional percentage of total amount
    fixedAmount?: number; // Optional fixed amount
  }[];
}

// Collection of proforma entry templates
export const proformaEntries: ProformaEntry[] = [
  {
    id: 'sales',
    name: 'Sales Transaction',
    description: 'Record a sale on account',
    lines: [
      {
        account: 'Accounts Receivable',
        description: 'Customer invoice',
        isDebit: true,
        percentage: 100,
      },
      {
        account: 'Sales Revenue',
        description: 'Sales revenue',
        isDebit: false,
        percentage: 100,
      }
    ]
  },
  {
    id: 'purchase',
    name: 'Purchase Transaction',
    description: 'Record a purchase on account',
    lines: [
      {
        account: 'Office Supplies',
        description: 'Purchase of supplies',
        isDebit: true,
        percentage: 100,
      },
      {
        account: 'Accounts Payable',
        description: 'Vendor invoice',
        isDebit: false,
        percentage: 100,
      }
    ]
  },
  {
    id: 'payment',
    name: 'Customer Payment',
    description: 'Record payment received from customer',
    lines: [
      {
        account: 'Cash',
        description: 'Customer payment',
        isDebit: true,
        percentage: 100,
      },
      {
        account: 'Accounts Receivable',
        description: 'Customer payment',
        isDebit: false,
        percentage: 100,
      }
    ]
  },
  {
    id: 'vendor-payment',
    name: 'Vendor Payment',
    description: 'Record payment made to vendor',
    lines: [
      {
        account: 'Accounts Payable',
        description: 'Vendor payment',
        isDebit: true,
        percentage: 100,
      },
      {
        account: 'Cash',
        description: 'Vendor payment',
        isDebit: false,
        percentage: 100,
      }
    ]
  },
  {
    id: 'payroll',
    name: 'Payroll Entry',
    description: 'Record bi-weekly payroll',
    lines: [
      {
        account: 'Salary Expense',
        description: 'Bi-weekly payroll',
        isDebit: true,
        percentage: 100,
      },
      {
        account: 'Cash',
        description: 'Bi-weekly payroll',
        isDebit: false,
        percentage: 100,
      }
    ]
  }
];

// Function to create journal lines based on proforma template and amount
export const generateJournalLinesFromProforma = (
  proformaId: string, 
  totalAmount: number
): { account: string; description: string; debit: string; credit: string }[] => {
  const template = proformaEntries.find(entry => entry.id === proformaId);
  
  if (!template) {
    return [
      { account: '', description: '', debit: '', credit: '' },
      { account: '', description: '', debit: '', credit: '' }
    ];
  }

  return template.lines.map(line => {
    let amount = 0;
    
    if (line.percentage) {
      amount = (line.percentage / 100) * totalAmount;
    } else if (line.fixedAmount) {
      amount = line.fixedAmount;
    }

    return {
      account: line.account,
      description: line.description,
      debit: line.isDebit ? amount.toFixed(2) : '',
      credit: !line.isDebit ? amount.toFixed(2) : ''
    };
  });
};

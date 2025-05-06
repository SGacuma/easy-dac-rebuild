
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Dashboard: React.FC = () => {
  // Mock data
  const financialSummary = {
    revenue: 125000,
    expenses: 78500,
    profit: 46500,
    accountsReceivable: 35000,
    accountsPayable: 22000,
    cashFlow: 15000,
    budgetUsage: 65,
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-dac-muted">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dac-foreground">
              {formatCurrency(financialSummary.revenue)}
            </div>
            <p className="text-xs text-green-500 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-dac-muted">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dac-foreground">
              {formatCurrency(financialSummary.expenses)}
            </div>
            <p className="text-xs text-red-500 mt-1">+5.8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-dac-muted">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dac-foreground">
              {formatCurrency(financialSummary.profit)}
            </div>
            <p className="text-xs text-green-500 mt-1">+8.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-dac-muted">Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dac-foreground">
              {formatCurrency(financialSummary.cashFlow)}
            </div>
            <p className="text-xs text-green-500 mt-1">+3.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Accounts Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Accounts Receivable</span>
                  <span className="text-sm font-medium">{formatCurrency(financialSummary.accountsReceivable)}</span>
                </div>
                <Progress value={70} className="h-2 bg-dac-border" indicatorColor="bg-dac-accent" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Accounts Payable</span>
                  <span className="text-sm font-medium">{formatCurrency(financialSummary.accountsPayable)}</span>
                </div>
                <Progress value={45} className="h-2 bg-dac-border" indicatorColor="bg-red-400" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Budget Usage</span>
                  <span className="text-sm font-medium">{financialSummary.budgetUsage}%</span>
                </div>
                <Progress value={financialSummary.budgetUsage} className="h-2 bg-dac-border" indicatorColor="bg-dac-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, date: '2025-05-05', description: 'Office Supplies', category: 'Expenses', amount: -1250 },
                { id: 2, date: '2025-05-04', description: 'Client Payment - ABC Corp', category: 'Revenue', amount: 7500 },
                { id: 3, date: '2025-05-03', description: 'Utility Bill', category: 'Expenses', amount: -350 },
                { id: 4, date: '2025-05-02', description: 'Consulting Services', category: 'Revenue', amount: 3200 },
                { id: 5, date: '2025-05-01', description: 'Software Subscription', category: 'Expenses', amount: -99 }
              ].map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-dac-muted">{transaction.date} • {transaction.category}</p>
                  </div>
                  <span className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

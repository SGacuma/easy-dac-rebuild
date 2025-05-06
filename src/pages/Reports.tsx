
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Reports: React.FC = () => {
  // Mock data for reports
  const reportCategories = [
    {
      title: 'Financial Statements',
      reports: [
        { id: 1, name: 'Balance Sheet', description: 'View assets, liabilities, and equity at a specific point in time' },
        { id: 2, name: 'Income Statement', description: 'Overview of revenues, costs, and expenses over a period' },
        { id: 3, name: 'Cash Flow Statement', description: 'Shows how changes in balance sheet accounts affect cash' },
      ]
    },
    {
      title: 'Accounts Receivable',
      reports: [
        { id: 4, name: 'Aging Report', description: 'Shows outstanding customer invoices grouped by age' },
        { id: 5, name: 'Customer Statements', description: 'Summary of transactions for specific customers' },
        { id: 6, name: 'Collections Report', description: 'Track overdue payments and collection efforts' },
      ]
    },
    {
      title: 'Accounts Payable',
      reports: [
        { id: 7, name: 'Vendor Aging', description: 'Shows outstanding bills grouped by age' },
        { id: 8, name: 'Payment Forecast', description: 'Projected cash outflow for upcoming bills' },
        { id: 9, name: 'Vendor Statements', description: 'Summary of transactions with specific vendors' },
      ]
    },
    {
      title: 'Tax Reports',
      reports: [
        { id: 10, name: 'Sales Tax Summary', description: 'Overview of sales tax collected by jurisdiction' },
        { id: 11, name: 'Tax Liability', description: 'Summary of taxes owed for a specific period' },
        { id: 12, name: 'Tax Payments', description: 'Record of tax payments made during a period' },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dac-foreground">Reports</h2>
        <Button variant="default" className="bg-dac-primary hover:bg-dac-secondary">Create Custom Report</Button>
      </div>

      <div className="space-y-6">
        <p className="text-dac-muted">
          Generate financial reports to gain insights into your business performance. Select a report from the categories below.
        </p>

        {reportCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.reports.map(report => (
                  <div 
                    key={report.id}
                    className="border border-dac-border rounded-lg p-4 hover:border-dac-primary hover:bg-dac-background cursor-pointer transition-all"
                  >
                    <h3 className="text-lg font-medium mb-2">{report.name}</h3>
                    <p className="text-sm text-dac-muted mb-4">{report.description}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Preview</Button>
                      <Button variant="default" size="sm" className="bg-dac-primary hover:bg-dac-secondary">Generate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border-b border-dac-border">
              <div>
                <p className="font-medium">Balance Sheet</p>
                <p className="text-sm text-dac-muted">Generated on May 5, 2025</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Download</Button>
                <Button variant="ghost" size="sm">Delete</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border-b border-dac-border">
              <div>
                <p className="font-medium">Income Statement</p>
                <p className="text-sm text-dac-muted">Generated on May 4, 2025</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Download</Button>
                <Button variant="ghost" size="sm">Delete</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3">
              <div>
                <p className="font-medium">Accounts Receivable Aging</p>
                <p className="text-sm text-dac-muted">Generated on May 3, 2025</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Download</Button>
                <Button variant="ghost" size="sm">Delete</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;

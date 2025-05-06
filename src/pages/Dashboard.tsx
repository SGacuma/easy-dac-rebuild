
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard: React.FC = () => {
  // Sample data for dashboard metrics
  const metrics = [
    { title: "Revenue", value: "$125,430", change: "+12.5%", trend: "up" },
    { title: "Expenses", value: "$54,210", change: "-3.2%", trend: "down" },
    { title: "Profit", value: "$71,220", change: "+18.7%", trend: "up" },
    { title: "Outstanding", value: "$28,150", change: "+2.4%", trend: "up" },
  ];

  // Sample data for revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 5000, expenses: 2800 },
    { month: 'Mar', revenue: 6000, expenses: 3200 },
    { month: 'Apr', revenue: 7000, expenses: 3600 },
    { month: 'May', revenue: 8000, expenses: 4000 },
    { month: 'Jun', revenue: 9000, expenses: 4500 },
  ];

  // Sample data for expense distribution
  const expenseDistribution = [
    { name: 'Operations', value: 35 },
    { name: 'Marketing', value: 25 },
    { name: 'R&D', value: 20 },
    { name: 'Admin', value: 15 },
    { name: 'Other', value: 5 },
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-dac-muted">{metric.title}</p>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                  <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{metric.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue vs Expenses Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
          <CardDescription>Monthly comparison for the current period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={revenueData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Status */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Status</CardTitle>
            <CardDescription>Current fiscal year budget utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Operations</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2 bg-gray-100" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Marketing</span>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2 bg-gray-100" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Research & Development</span>
                  <span className="text-sm font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2 bg-gray-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
            <CardDescription>Breakdown of expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Last 5 transactions entered into the system</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b border-dac-border text-left">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium">Account</th>
                <th className="pb-2 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-dac-border">
                <td className="py-3 text-sm">2025-05-06</td>
                <td className="py-3 text-sm">Client Payment - XYZ Inc</td>
                <td className="py-3 text-sm">Accounts Receivable</td>
                <td className="py-3 text-sm text-right">$4,500</td>
              </tr>
              <tr className="border-b border-dac-border">
                <td className="py-3 text-sm">2025-05-05</td>
                <td className="py-3 text-sm">Office Supplies</td>
                <td className="py-3 text-sm">Expenses</td>
                <td className="py-3 text-sm text-right text-red-500">-$350</td>
              </tr>
              <tr className="border-b border-dac-border">
                <td className="py-3 text-sm">2025-05-03</td>
                <td className="py-3 text-sm">Client Invoice - ABC Corp</td>
                <td className="py-3 text-sm">Sales Revenue</td>
                <td className="py-3 text-sm text-right">$7,200</td>
              </tr>
              <tr className="border-b border-dac-border">
                <td className="py-3 text-sm">2025-05-02</td>
                <td className="py-3 text-sm">Rent Payment</td>
                <td className="py-3 text-sm">Rent Expense</td>
                <td className="py-3 text-sm text-right text-red-500">-$2,000</td>
              </tr>
              <tr>
                <td className="py-3 text-sm">2025-05-01</td>
                <td className="py-3 text-sm">Utilities</td>
                <td className="py-3 text-sm">Utilities Expense</td>
                <td className="py-3 text-sm text-right text-red-500">-$450</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
        <CardFooter>
          <a href="/transactions" className="text-sm text-dac-primary hover:underline">View all transactions</a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;

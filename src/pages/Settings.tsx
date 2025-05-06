
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dac-foreground">Settings</h2>
        <Button variant="default" className="bg-dac-primary hover:bg-dac-secondary">Save Changes</Button>
      </div>

      <Tabs defaultValue="company">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Company Name</label>
                    <Input type="text" defaultValue="Acme Corporation" className="bg-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tax ID / EIN</label>
                    <Input type="text" defaultValue="12-3456789" className="bg-white" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Address</label>
                  <Input type="text" defaultValue="123 Business Ave" className="bg-white mb-2" />
                  <Input type="text" placeholder="Suite, Unit, Building (Optional)" className="bg-white mb-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">City</label>
                    <Input type="text" defaultValue="San Francisco" className="bg-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">State/Province</label>
                    <Input type="text" defaultValue="CA" className="bg-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Postal Code</label>
                    <Input type="text" defaultValue="94103" className="bg-white" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Country</label>
                    <Select defaultValue="us">
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone</label>
                    <Input type="tel" defaultValue="(555) 123-4567" className="bg-white" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input type="email" defaultValue="accounting@acmecorp.com" className="bg-white" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Website</label>
                  <Input type="url" defaultValue="https://www.acmecorp.com" className="bg-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accounting">
          <Card>
            <CardHeader>
              <CardTitle>Accounting Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Fiscal Year</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Fiscal Year Start</label>
                      <Select defaultValue="january">
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select start month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="january">January</SelectItem>
                          <SelectItem value="february">February</SelectItem>
                          <SelectItem value="july">July</SelectItem>
                          <SelectItem value="october">October</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tax Year End</label>
                      <Select defaultValue="december">
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select end month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="december">December</SelectItem>
                          <SelectItem value="march">March</SelectItem>
                          <SelectItem value="june">June</SelectItem>
                          <SelectItem value="september">September</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Default Currency</h3>
                  <Select defaultValue="usd">
                    <SelectTrigger className="bg-white w-full md:w-1/2">
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Chart of Accounts</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Lock Periods</p>
                      <p className="text-sm text-dac-muted">Prevent changes to transactions in closed periods</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Account Numbers</p>
                      <p className="text-sm text-dac-muted">Show account numbers in Chart of Accounts</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Tax Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tax Form</label>
                      <Select defaultValue="1120">
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select tax form" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1120">Form 1120 - Corporate</SelectItem>
                          <SelectItem value="1120s">Form 1120S - S Corporation</SelectItem>
                          <SelectItem value="1065">Form 1065 - Partnership</SelectItem>
                          <SelectItem value="1040">Schedule C (Form 1040)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tax Method</label>
                      <Select defaultValue="accrual">
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="accrual">Accrual</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Users & Permissions</CardTitle>
              <Button variant="default" className="bg-dac-primary hover:bg-dac-secondary">Add User</Button>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dac-border">
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Email</th>
                    <th className="text-left py-3 px-4 font-medium">Role</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-dac-border">
                    <td className="py-3 px-4">John Smith</td>
                    <td className="py-3 px-4">john@acmecorp.com</td>
                    <td className="py-3 px-4">Administrator</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Active</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      <Button variant="ghost" size="sm">Deactivate</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-dac-border">
                    <td className="py-3 px-4">Sarah Johnson</td>
                    <td className="py-3 px-4">sarah@acmecorp.com</td>
                    <td className="py-3 px-4">Accountant</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Active</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      <Button variant="ghost" size="sm">Deactivate</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Michael Brown</td>
                    <td className="py-3 px-4">michael@acmecorp.com</td>
                    <td className="py-3 px-4">Bookkeeper</td>
                    <td className="py-3 px-4">
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">Inactive</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      <Button variant="ghost" size="sm">Activate</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Appearance & Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Date Format</h3>
                  <Select defaultValue="mm-dd-yyyy">
                    <SelectTrigger className="bg-white w-full md:w-1/2">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Number Format</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Decimal Symbol</label>
                      <Select defaultValue="period">
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select symbol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="period">Period (.)</SelectItem>
                          <SelectItem value="comma">Comma (,)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Thousands Separator</label>
                      <Select defaultValue="comma">
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select separator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comma">Comma (,)</SelectItem>
                          <SelectItem value="period">Period (.)</SelectItem>
                          <SelectItem value="space">Space</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Interface Options</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Compact View</p>
                      <p className="text-sm text-dac-muted">Show more data with a more compact UI</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Auto-save Entries</p>
                      <p className="text-sm text-dac-muted">Automatically save data as you type</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notification Sounds</p>
                      <p className="text-sm text-dac-muted">Play sound when actions complete</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

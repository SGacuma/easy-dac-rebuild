
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Users: React.FC = () => {
  // Mock user data
  const users = [
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john@acmecorp.com', 
      role: 'Administrator', 
      lastLogin: '2025-05-06 09:15 AM', 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah@acmecorp.com', 
      role: 'Accountant', 
      lastLogin: '2025-05-05 04:30 PM', 
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'Michael Brown', 
      email: 'michael@acmecorp.com', 
      role: 'Bookkeeper', 
      lastLogin: '2025-04-28 10:45 AM', 
      status: 'Inactive' 
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      email: 'emily@acmecorp.com', 
      role: 'Viewer', 
      lastLogin: '2025-05-06 08:20 AM', 
      status: 'Active' 
    },
    { 
      id: 5, 
      name: 'David Wilson', 
      email: 'david@acmecorp.com', 
      role: 'Accountant', 
      lastLogin: '2025-05-04 02:10 PM', 
      status: 'Active' 
    },
  ];

  return (
    <Layout pageTitle="Users">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dac-foreground">Users Management</h2>
          <Button variant="default" className="bg-dac-primary hover:bg-dac-secondary">
            Add New User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dac-muted mb-4">
              User roles determine what actions users can perform in the system. Assign appropriate roles based on job responsibilities.
            </p>
            
            <div className="bg-dac-background border border-dac-border rounded-md p-4 mb-6">
              <h3 className="font-medium mb-2">Available Roles</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Administrator:</span>
                  <span>Full access to all functions, including user management and system settings.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Accountant:</span>
                  <span>Can create and edit all financial transactions, run reports, and manage accounts.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Bookkeeper:</span>
                  <span>Can enter and edit basic transactions but cannot access advanced features or settings.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Viewer:</span>
                  <span>Read-only access to view transactions and run reports without editing capabilities.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="bg-dac-background border-b border-dac-border">
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Last Login</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-dac-border hover:bg-dac-background">
                    <td className="px-4 py-3 text-sm">{user.name}</td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">{user.role}</td>
                    <td className="px-4 py-3 text-sm">{user.lastLogin}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      <Button 
                        variant={user.status === 'Active' ? 'ghost' : 'default'} 
                        size="sm"
                        className={user.status !== 'Active' ? 'bg-dac-primary hover:bg-dac-secondary' : ''}
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start border-b border-dac-border pb-3">
                <div className="flex-1">
                  <p className="font-medium">John Smith updated company settings</p>
                  <p className="text-sm text-dac-muted">May 6, 2025 - 10:15 AM</p>
                </div>
              </div>
              <div className="flex items-start border-b border-dac-border pb-3">
                <div className="flex-1">
                  <p className="font-medium">Sarah Johnson created a new journal entry</p>
                  <p className="text-sm text-dac-muted">May 5, 2025 - 3:42 PM</p>
                </div>
              </div>
              <div className="flex items-start border-b border-dac-border pb-3">
                <div className="flex-1">
                  <p className="font-medium">David Wilson generated Balance Sheet report</p>
                  <p className="text-sm text-dac-muted">May 5, 2025 - 1:30 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-1">
                  <p className="font-medium">Emily Davis logged in for the first time</p>
                  <p className="text-sm text-dac-muted">May 4, 2025 - 9:15 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Users;

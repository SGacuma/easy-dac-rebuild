
import React from 'react';
import Layout from '../components/layout/Layout';
import Dashboard from './Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <Layout pageTitle="Dashboard">
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;

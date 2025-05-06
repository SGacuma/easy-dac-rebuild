
import React from 'react';
import Layout from '../components/layout/Layout';
import ChartOfAccounts from './ChartOfAccounts';

const ChartOfAccountsPage: React.FC = () => {
  return (
    <Layout pageTitle="Chart of Accounts">
      <ChartOfAccounts />
    </Layout>
  );
};

export default ChartOfAccountsPage;

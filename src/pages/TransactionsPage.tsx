
import React from 'react';
import Layout from '../components/layout/Layout';
import Transactions from './Transactions';

const TransactionsPage: React.FC = () => {
  return (
    <Layout pageTitle="Transactions">
      <Transactions />
    </Layout>
  );
};

export default TransactionsPage;


import React from 'react';
import Layout from '../components/layout/Layout';
import GeneralLedger from './GeneralLedger';

const GeneralLedgerPage: React.FC = () => {
  return (
    <Layout pageTitle="General Ledger">
      <GeneralLedger />
    </Layout>
  );
};

export default GeneralLedgerPage;

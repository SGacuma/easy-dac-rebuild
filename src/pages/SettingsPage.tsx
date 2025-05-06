
import React from 'react';
import Layout from '../components/layout/Layout';
import Settings from './Settings';

const SettingsPage: React.FC = () => {
  return (
    <Layout pageTitle="Settings">
      <Settings />
    </Layout>
  );
};

export default SettingsPage;

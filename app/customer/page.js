import React from 'react';
import CustomerPage from '@/components/CustomerMain';
import CustomerMain from '@/components/CustomerMain';

const CustomerDashboard = () => {
  // Replace this with the actual customer ID after login
  const customerId = 'some-customer-id';

  return (
    <div>
      <CustomerMain customerId={customerId} />
    </div>
  );
};

export default CustomerDashboard;
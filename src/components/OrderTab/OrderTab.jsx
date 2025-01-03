import React from 'react';
import OrderCard from '../OrderCard/OrderCard';

const OrderTab = ({items}) => {
  return (
      <div className='grid md:grid-cols-3 gap-6'>
                  
               {items.map(sl=><OrderCard key={sl._id} items={sl}></OrderCard>)}
              </div>
  );
};

export default OrderTab;
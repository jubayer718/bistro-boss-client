import React, { useState } from 'react';
import Cover from '../../components/cover/Cover';
import orderImg from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../Hooks/useMenu';
import OrderTab from '../../components/OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
  const categories = ['Salad','Pizza','Soup','Dessert','Drinks']
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  console.log(category);
  const desserts=menu.filter(item=>item.category==='dessert')
  const pizza=menu.filter(item=>item.category==='pizza')
  const salad=menu.filter(item=>item.category==='salad')
  const soup=menu.filter(item=>item.category==='soup')
  const drinks=menu.filter(item=>item.category==='drinks')

  return (
    <div >
      <Helmet>
        <title>Bistro Boss | Order</title>
      </Helmet>
      <Cover title={'Order Food'} img={orderImg}></Cover>
    {/* tabs */}
      <div className='my-12'>
        
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
  <TabList>
    <Tab>Salad</Tab>
    <Tab>Pizza</Tab>
    <Tab>Soup</Tab>
    <Tab>Dessert</Tab>

    <Tab>Drinks</Tab>
  </TabList>
          <TabPanel>
         <OrderTab items={salad}></OrderTab>
  </TabPanel>
          <TabPanel>
             <OrderTab items={pizza}></OrderTab>
  </TabPanel>
          <TabPanel>
             <OrderTab items={soup}></OrderTab>
  </TabPanel>
          <TabPanel>
             <OrderTab items={desserts}></OrderTab>
  </TabPanel>
          <TabPanel>
             <OrderTab items={drinks}></OrderTab>
  </TabPanel>
 
</Tabs>
    </div>
    </div>
  );
};

export default Order;
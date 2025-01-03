import React from 'react';
import Banner from './Banner/Banner';
import Category from '../category/Category';
import PopularMenu from '../../components/PopularMenu';
import Featured from '../../components/Featured/Featured';
import Testimonials from '../../components/Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>
      <Helmet><title>Bistro Boss | Home</title></Helmet>
      <Banner></Banner>
      <Category></Category>
      <PopularMenu></PopularMenu>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
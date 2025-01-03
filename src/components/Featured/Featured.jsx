import React from 'react';
import SectionTitle from '../SectionTitle';
import featuredImg from '../../assets/home/featured.jpg'
import './Feature.css'

const Featured = () => {
  return (
    <div className='featured-items bg-fixed pt-7'>
      <SectionTitle heading='from our menu' subHeading='Check it out'></SectionTitle>
     {/* parent div */}
      <div className='flex items-center justify-center bg-slate-100 bg-opacity-40 py-10 px-16 gap-5'>
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className='space-y-2 text-white'>
          <p>Dec 30, 2024</p>
          <h4 className='uppercase'>What can I get some</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque vero quas minima accusamus porro, odit dolore unde, inventore assumenda qui sequi praesentium laborum ducimus reprehenderit. A consectetur necessitatibus laudantium totam nam rem saepe eligendi deserunt quam ipsum. Nihil fugit a quidem reiciendis neque facere libero repellendus perferendis obcaecati quis?</p>
          <button className='btn btn-outline border-0 border-b-4 font-bold'>Order now</button>
        </div>

      </div>

    </div>
  );
};

export default Featured;
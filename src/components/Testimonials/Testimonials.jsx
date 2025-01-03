import React, { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// import required modules
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Testimonials = () => {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/review')
      .then(res => res.json())
    .then(data=>setReviews(data))
  },[])
  return (
    <section>
      <SectionTitle
        subHeading={'What Our Client Say'}
        heading={'Testimonials'}
      ></SectionTitle>
      <div className=''>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper px-20">
       
          {reviews.map(review => <SwiperSlide
            className=" px-20"
          key={review._id}
          >
            <p className='my-12 flex items-center justify-center'><Rating
             
      style={{ maxWidth: 180 }}
      value={review.rating}
      readOnly
    /></p>
            <p>{review.details}</p>
            <h3 className="text-2xl text-orange-400 text-center my-2">{ review.name}</h3>
          </SwiperSlide>)}
      </Swiper>
</div>
      
    </section>
  );
};

export default Testimonials;
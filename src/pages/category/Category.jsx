// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import slide1 from '../../assets/home/slide1.jpg'
import slide2 from '../../assets/home/slide2.jpg'
import slide3 from '../../assets/home/slide3.jpg'
import slide4 from '../../assets/home/slide4.jpg'
import slide5 from '../../assets/home/slide5.jpg'
import SectionTitle from '../../components/SectionTitle';

const Category = () => {
  return (
    <section>
      <SectionTitle
       
        heading={"Online Order"}
        subHeading={"10.00am-10pm"}
      ></SectionTitle>
      <Swiper
      slidesPerView={4}
      spaceBetween={30}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper mb-12"
    >
      <SwiperSlide>
        <img src={slide1} alt="" />
        <h3 className="text-4xl uppercase text-center text-white -mt-24">salads</h3>
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide2} alt="" />
        <h3 className="text-4xl uppercase text-center text-white -mt-24">Pizzas</h3>


      </SwiperSlide>
      <SwiperSlide>
        <img src={slide3} alt="" />
        <h3 className="text-4xl uppercase text-center text-white -mt-24">csupe</h3>


      </SwiperSlide>
      <SwiperSlide>
        <img src={slide4} alt="" />
        <h3 className="text-4xl uppercase text-center text-white -mt-24">cake</h3>


      </SwiperSlide>
      <SwiperSlide>
        <img src={slide5} alt="" />
        <h3 className="text-4xl uppercase text-center text-white -mt-24">salads</h3>


      </SwiperSlide>


    </Swiper>
    </section>
  );
};

export default Category;
import { Helmet } from 'react-helmet-async';
import Cover from '../../components/cover/Cover';
import CoverImg from '../../assets/menu/banner3.jpg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import PopularMenu from '../../components/PopularMenu';
import useMenu from '../../Hooks/useMenu';
import SectionTitle from '../../components/SectionTitle';
import MenuCategory from '../../components/menuCategory/MenuCategory';



const OurMenu = () => {
 
  const [menu] = useMenu();
  const desserts=menu.filter(item=>item.category==='dessert')
  const pizza=menu.filter(item=>item.category==='pizza')
  const salad=menu.filter(item=>item.category==='salad')
  const soup=menu.filter(item=>item.category==='soup')
  const offered=menu.filter(item=>item.category==='offered')
  return (
    <div>
    <Helmet>
    <title>Bistro Boss | Menu</title>
    </Helmet>
      <Cover img={CoverImg} title='Our Menu'></Cover>
      <SectionTitle subHeading={"Don't Miss"} heading={"Todays Offer"}></SectionTitle>
      {/* offer menu items  */}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu items */}
      <MenuCategory title={'Dessert'} items={desserts} CoverImg={dessertImg}></MenuCategory>
      {/* pizza menu items */}
    <MenuCategory title={'Pizza'} items={pizza} CoverImg={pizzaImg}></MenuCategory>
      {/* Soup menu items */}
      <MenuCategory title={'Soup'} items={soup} CoverImg={soupImg}></MenuCategory>
      {/* Salad menu items */}
      <MenuCategory title={'Salad'} items={salad} CoverImg={saladImg}></MenuCategory>
    </div>
  );
};

export default OurMenu;
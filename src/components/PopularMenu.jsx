import React, { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import { data } from 'react-router-dom';
import MenuItems from './MenuItems';
import useMenu from '../Hooks/useMenu';

const PopularMenu = () => {

  const [menu] = useMenu();
  const PopularMenu=menu.filter(item=>item.category==='popular')
  // const [menu, setMenu] = useState([]);
  
  // useEffect(() => {
  //   fetch('/menu.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       const filterData = data.filter((items) => items.category === 'popular');
  //       setMenu(filterData)

  //     })
  // }, [])
  return (
    <div>
      <section>
        <SectionTitle
          subHeading={'Popular Items'}
          heading={'From Our Menu'}
        >

        </SectionTitle>
      </section>
      {/* menu data */}
      <section className='grid md:grid-cols-2 gap-3 mb-5'>
        {
          PopularMenu.map(items => <MenuItems

            key={items._id}
            items={items}
          ></MenuItems>)
        }
      </section>

    </div>
  );
};

export default PopularMenu;
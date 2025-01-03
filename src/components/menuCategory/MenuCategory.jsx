
import { Link } from 'react-router-dom';
import Cover from '../cover/Cover';
import MenuItems from '../MenuItems';

const MenuCategory = ({items,title, CoverImg}) => {
  return (
    <div>
       {title &&  <Cover img={CoverImg} title={title}></Cover>}

       <section className='grid md:grid-cols-2 gap-3 mb-5'>

        {
          items.map(item => <MenuItems

            key={item._id}
            items={item}
          ></MenuItems>)
        }
      </section>
      <Link to={`/order/${title}`}>
        <button className='btn btn-outline border-0 border-b-4 font-bold'>Order now</button>
      </Link>
   </div>
  );
};

export default MenuCategory;
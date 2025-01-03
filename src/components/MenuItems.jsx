

const MenuItems = ({ items }) => {
  
  const {recipe,price,name,image,category}=items
  return (
    <div className=' gap-4'>
      <div className='flex items-center gap-4'>

          <img className='w-20 ' style={{borderRadius:'0 200px 200px 200px'}} src={image} alt="" />
      <div>
        <h2 className='uppercase'>{name}-----------------</h2>
        <p>{recipe}</p>
      </div>
    </div>
    </div>
  );
};

export default MenuItems;
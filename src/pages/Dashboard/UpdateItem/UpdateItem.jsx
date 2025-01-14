import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import userAxiosPublic from '../../../Hooks/userAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItem = () => {
  const {name,category,recipe,price,image,_id} = useLoaderData();
 const axiosPublic = userAxiosPublic();
  const axiosInstance = useAxiosSecure();
  const { register, handleSubmit,reset } = useForm()
  const onSubmit = async(data) => {

    
    const image_file={image:data.image[0]}
    // image upload to imgbb and then get and url
    const res = await axiosPublic.post(image_hosting_api, image_file, {
      headers: {
        'content-Type': `multipart/form-data`
      }
    });
    if (res.data.success) {
      const menuItems = {
        name: data.name,
        price: data.price,
        recipe: data.recipe,
        category:data.category,
        price: parseFloat(data.price),
        image: res.data.data.display_url,
      }
      const menuRes = await axiosInstance.patch(`/menu/${_id}`, menuItems);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount>0) {
        reset();
        Swal.fire({
  position: "top-end",
  icon: "success",
  title: `${data.name} is update to menu.`,
  showConfirmButton: false,
  timer: 1500
});
      }
    }
    console.log(res.data);

  }
  return (
    <div>
      <SectionTitle heading="Update an item" subHeading="Refresh"></SectionTitle>
       <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full my-6">
                  <div className="label">
                    <span className="label-text">Recipe Name*</span>
      
                  </div>
                  <input defaultValue={name} {...register("name",{required:true})} type="text" placeholder="recipe name" className="input input-bordered w-full " />
      
                </label>
      
                <div className="flex gap-6">
                  {/* category */}
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">category*</span>
      
                    </div>
              <select defaultValue={ category}{...register("category",{required:true})} className="select select-bordered w-full ">
                      <option disabled  value="default">Select a category</option>
                      <option value="salad">Salad</option>
                      <option value="pizza">Pizza</option>
                      <option value="soup">Soup</option>
                      <option value="dessert">Dessert</option>
                      <option value="drinks">Drinks</option>
                    </select>
                  </label>
      
      
                  {/* price */}
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Price</span>
      
                    </div>
                    <input defaultValue={price} {...register("price",{required:true})} type="number" placeholder="Price" className="input input-bordered w-full " />
      
                  </label>
                </div>
                {/* recipe details */}
                <label className="form-control my-6  w-full">
                  <div className="label">
                    <span className="label-text">Recipe Details</span>
                  </div>
                  <textarea defaultValue={recipe} {...register('recipe',{required:true})}  className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
      
                </label>
                {/* choose file */}
                <label className="form-control my-4 w-full">
                  <div className="label">
                    <span className="label-text">Pick a file</span>
      
                  </div>
                  <input {...register('image',{required:true})} type="file" className="file-input file-input-bordered w-full" />
      
                </label>
                <div>
                <button className="btn btn-neutral">Update the menu</button>
              
                </div>
                
              </form>
            </div>
     
    </div>
  );
};

export default UpdateItem;
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    createUser(data?.email, data?.password)
      .then(result => {
        console.log(result.user);

        updateUserProfile(data?.name, data?.photoURL)
          .then(() => {
            Swal.fire('signup successful!!!')
            reset()
            navigate('/')
          })
      })



  }
  // console.log(watch("example")) 

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" {...register("name", { required: true })} name='name' placeholder="name" className="input input-bordered" />
              {errors.name && <span className='text-red-600'>name is required</span>}

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input type="text" {...register("photoURL", { required: true })} name='photoURL' placeholder="photoURL" className="input input-bordered" />
              {errors.photoURL && <span className='text-red-600'>Photo URL is required</span>}

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
              {errors.email && <span className='text-red-600'>email is required</span>}

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" {...register("password", {
                required: true,
                pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                minLength: 6,
                maxLength: 20
              })} placeholder="password" className="input input-bordered" />
              {errors.password?.type === "required" && (
                <p role="alert" className='text-red-600'>password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p role="alert" className='text-red-600'>password must be 6 character </p>
              )}
              {errors.password?.type === "pattern" && (
                <p role="alert" className='text-red-600'>password must have one uppercase one lowercase one number one special character  </p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value='Sign Up' />

            </div>
          </form>
          <p className='text-center my-2'><small>already have account go to </small><Link className='font-bold' to='/login'>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { use } from 'react';
import Social from '../../components/social/Social';

const Login = () => {
  const { signIn,updateUserProfile} = useAuth();
 let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [disabled,setDisabled]=useState(true)
  useEffect(() => {
     loadCaptchaEnginge(6); 
  },[])
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
  title: "Sign In successful!!!",
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
  }
        });
        updateUserProfile()
         navigate(from, { replace: true });
    })
    
  }
  const handleValidateCaptcha = (e) => {
    const validateData = e.target.value;
    if (validateCaptcha(validateData)) {
     setDisabled(false)
    } else {
      setDisabled(true)
   }
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center md:w-1/2">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="type your email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="type your password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <LoadCanvasTemplate />
          </label>
          <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="type captcha above" className="input input-bordered" />
       
        </div>
            <div className="form-control mt-6">
              {/* TODO: enable recaptcha  */}
          <button disabled={false} className="btn btn-primary">Login</button>
        </div>
          </form>
          <p className='text-center mb-3'><small>New here?</small><Link
            className='text-red-500 font-bold'
            to='/signUp'>Create a new Account</Link></p>
          <Social></Social>
    </div>
  </div>
</div>
  );
};

export default Login;
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useCart from '../../../Hooks/useCart';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = () => {
    const stripe = useStripe();
  const elements = useElements();
const navigate=useNavigate()
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [error, setError] = useState('');
  const [transactionId,setTransactionId]=useState('')
  const [clientSecret, setClientSecret] = useState('');
  const [cart,refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  useEffect(() => {
    if (totalPrice>0) {
      axiosInstance.post('/create-payment-intent', { price: totalPrice })
      .then(res => {
        console.log('inside checkOut form', res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
    })
    }
    },[axiosInstance,totalPrice])
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
      if (card == null) {
        return;
    }
    const {error,paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })
    if (error) {
      console.log('[error]', error);
      setError(error.message)
    } else {
      console.log('[paymentMethod]', paymentMethod);
      setError('')
    }
    //confirm payment 
    const {paymentIntent,error:confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name:user?.displayName||'anonymous'
        }
      }
    })
    if (confirmError) {
      console.log(confirmError);
    } else {
      if (paymentIntent.status === 'succeeded') {
        console.log('paymentIntent', paymentIntent);
        setTransactionId(paymentIntent.id)
        // now save the payment in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId:paymentIntent.id,
          date: new Date(), //convert date ,use moment js
          cartIds: cart.map(item => item._id),
          menuIds: cart.map(item => item.menuId),
          status: 'pending',

        }
        const res = await axiosInstance.post('/payments', payment);
        refetch();
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Payment success",
  showConfirmButton: false,
  timer: 1500
});
        }
       navigate('/dashboard/paymentHistory')
        
      }
    }

  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-sm my-4 btn-primary' type="submit" disabled={!stripe||!clientSecret}>
        Pay
      </button>
      </form>
      <p className='text-red-600'>{error}</p>
      {transactionId  && <p className='text-green-600'>{ transactionId}</p> }
     
    </div>
  );
};

export default CheckOutForm;
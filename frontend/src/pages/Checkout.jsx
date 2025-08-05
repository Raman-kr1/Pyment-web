import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import api from '../api/axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function CheckoutForm({ orderId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [status, setStatus] = useState('init');

  useEffect(() => {
    (async () => {
      const { data } = await api.post('/payments/intent',{ orderId });
      setClientSecret(data.clientSecret);
    })();
  }, [orderId]);

  const pay = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });
    if (error) setStatus(error.message);
    else setStatus(paymentIntent.status); // will be "requires_capture" or "succeeded"
  };

  return (
    <>
      <form onSubmit={pay}>
        <CardElement />
        <button disabled={!stripe}>Pay</button>
      </form>
      {status}
    </>
  );
}

export default function Checkout() {
  const [dummyOrderId, setDummyOrderId] = useState(null);

  // For demo, create order when component mounts
  useEffect(() => {
    (async () => {
      const { data } = await api.post('/orders', {
        items:[{ productId:'sku_demo', name:'T-Shirt', price:1999, qty:1 }],
        amount:1999
      });
      setDummyOrderId(data._id);
    })();
  }, []);

  if (!dummyOrderId) return 'loading…';
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderId={dummyOrderId}/>
    </Elements>
  );
}
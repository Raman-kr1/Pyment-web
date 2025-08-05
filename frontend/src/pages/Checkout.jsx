// src/pages/Checkout.jsx
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../api/axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function CheckoutForm({ orderId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [status, setStatus] = useState('Enter card details to pay');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (orderId) {
      api.post('/payments/intent', { orderId })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(err => {
          setStatus('Could not create payment intent.');
          setIsError(true);
          console.error(err);
        });
    }
  }, [orderId]);

  const pay = async e => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setStatus('Processing...');
    setIsError(false);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });

    if (error) {
      setStatus(error.message);
      setIsError(true);
    } else {
      setStatus(paymentIntent.status === 'succeeded' ? 'Payment Succeeded!' : 'Payment requires action.');
      setIsError(paymentIntent.status !== 'succeeded');
    }
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <form onSubmit={pay}>
        <CardElement />
        <button disabled={!stripe || !clientSecret}>Pay</button>
      </form>
      {status && <p className={`message ${isError ? 'error' : 'success'}`}>{status}</p>}
    </div>
  );
}

export default function Checkout() {
  const [dummyOrderId, setDummyOrderId] = useState(null);

  useEffect(() => {
    api.post('/orders', {
      items: [{ productId: 'sku_demo', name: 'T-Shirt', price: 1999, qty: 1 }],
      amount: 1999,
      currency: 'usd'
    })
    .then(res => setDummyOrderId(res.data._id))
    .catch(err => {
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        window.location.href = '/login';
      }
    });
  }, []);

  if (!dummyOrderId) return 'Creating order...';

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderId={dummyOrderId} />
    </Elements>
  );
}
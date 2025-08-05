// frontend/src/pages/Donation.jsx
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../api/axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function DonationForm({ clientSecret, orderDetails }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('Enter card details to donate');
  const [isError, setIsError] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setStatus('Processing...');
    setIsError(false);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (error) {
      setStatus(error.message);
      setIsError(true);
    } else {
      setStatus(paymentIntent.status === 'succeeded' ? 'Thank you for your donation!' : 'Payment requires action.');
      setIsError(paymentIntent.status !== 'succeeded');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <h2>Support Anany Pahal Foundation</h2>
      <p style={{ textAlign: 'center', margin: '-1rem 0 1.5rem 0', color: '#555' }}>
        Your contribution will help empower underprivileged communities through education and social welfare programs.
      </p>
      <form onSubmit={handlePay}>
        <div style={{marginBottom: '1rem'}}>
            <strong>Amount:</strong> ${(orderDetails.amount / 100).toFixed(2)} {orderDetails.currency.toUpperCase()}
        </div>
        <CardElement />
        <button disabled={!stripe || !clientSecret}>Donate Now</button>
      </form>
      {status && <p className={`message ${isError ? 'error' : 'success'}`}>{status}</p>}
    </div>
  );
}

export default function DonationPage() {
  const [order, setOrder] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // 1. Create the order for the donation
    api.post('/orders', {
      items: [{ productId: 'donation_ananypahal', name: 'Donation', price: 2500, qty: 1 }],
      amount: 2500, // Example: $25.00
      currency: 'usd',
    })
    .then(orderRes => {
      setOrder(orderRes.data);
      // 2. Create the payment intent for that order
      return api.post('/payments/intent', { orderId: orderRes.data._id });
    })
    .then(intentRes => {
      setClientSecret(intentRes.data.clientSecret);
    })
    .catch(err => {
      if (err.response?.status === 401) {
        window.location.href = '/login';
      }
      console.error(err);
    });
  }, []);

  if (!clientSecret) return 'Loading donation form...';

  return (
    <Elements stripe={stripePromise}>
      <DonationForm clientSecret={clientSecret} orderDetails={order} />
    </Elements>
  );
}
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../api/axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function DonationForm({ clientSecret, orderDetails }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('Please enter your card details to complete the donation.');
  const [isError, setIsError] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setStatus('Processing your donation...');
    setIsError(false);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (error) {
      setStatus(error.message);
      setIsError(true);
    } else {
      setStatus(paymentIntent.status === 'succeeded' ? 'Thank you for your generous donation!' : 'Payment requires action.');
      setIsError(paymentIntent.status !== 'succeeded');
    }
  };

  return (
    <div className="container">
      <h2>Support Anany Pahal Foundation</h2>
      <p style={{ textAlign: 'center', margin: '-1rem 0 1.5rem 0', color: '#555' }}>
        The Anany Pahal Foundation is a dedicated non-profit organization focused on holistic social development. Your contribution empowers underprivileged communities through vital education, healthcare, and welfare programs in Uttar Pradesh.
      </p>
      <form onSubmit={handlePay}>
        <div style={{marginBottom: '1rem'}}>
          <strong>Donation Amount:</strong>
          <span style={{float: 'right', fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50'}}>
            ${(orderDetails.amount / 100).toFixed(2)} {orderDetails.currency.toUpperCase()}
          </span>
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
    api.post('/orders', {
      items: [{ productId: 'donation_ananypahal', name: 'Donation', price: 2500, qty: 1 }],
      amount: 2500,
      currency: 'usd',
    })
    .then(orderRes => {
      setOrder(orderRes.data);
      return api.post('/payments/intent', { orderId: orderRes.data._id });
    })
    .then(intentRes => {
      setClientSecret(intentRes.data.clientSecret);
    })
    .catch(err => {
      if (err.response?.status === 401) window.location.href = '/login';
      console.error(err);
    });
  }, []);

  if (!clientSecret || !order) return <div className="page-container">Loading donation form...</div>;

  return (
    <div className="page-container">
      <Elements stripe={stripePromise}>
        <DonationForm clientSecret={clientSecret} orderDetails={order} />
      </Elements>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`http://tebonabrady.vercel.app/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, [location.search]);

  if (status === 'open') {
    return (
      <div>
        <h1>Payment in progress...</h1>
      </div>
    );
  }

  if (status === 'complete') {
    return (
      <div>
        <h1>Payment successful!</h1>
        <p>Thank you for your purchase. An email receipt has been sent to {customerEmail}.</p>
      </div>
    );
  }

  return null;
};

export default Return;

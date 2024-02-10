import * as paypal from 'paypal-rest-sdk';

paypal.configure({
  mode: process.env.PAYPAL_MODE, // or 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});

export default paypal
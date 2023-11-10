import paypal from 'paypal-rest-sdk';
import {constns} from "./paypal.constants";

paypal.configure({
  mode: 'sandbox', // or 'live' for production
  client_id: constns.client_id,
  client_secret: constns.client_secret,
});

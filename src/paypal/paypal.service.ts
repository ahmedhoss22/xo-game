import { Injectable } from '@nestjs/common';
import paypal from './paypal.config';
// import fetch from 'node-fetch';
import('node-fetch').then(fetch => {
  // Your code that uses 'fetch' goes here
}).catch(error => {
  // Handle errors
  console.error('Error importing node-fetch:', error);
});
import * as dotenv from "dotenv"


@Injectable()
export class PaypalService {
  enviroment = process.env.PAYPAL_MODE || 'sandox';
  PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
  PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET

  paypal_endpoint = process.env.PAYPAL_URL


      async generateAccessToken() {
        try {
          if (!this.PAYPAL_CLIENT_ID || !this.PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
          }
          const auth = Buffer.from(
            this.PAYPAL_CLIENT_ID + ":" + this.PAYPAL_CLIENT_SECRET
          ).toString("base64");
      
          const body = new URLSearchParams();
          body.append("grant_type", "client_credentials");
            
          const response = await fetch(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, {
            method: "POST",
            body: body.toString(),
            headers: {
              Authorization: `Basic ${auth}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data: any = await response.json();
          
          if (!data.access_token) {
            throw new Error(`Access token not received: ${JSON.stringify(data)}`);
          }
      
          return data.access_token;
        } catch (error) {
          console.error("Failed to generate Access Token:", error.message);
          throw error;
        }
      }
      
      
      
      async createOrder   (cart)  {
        const accessToken = await this.generateAccessToken();
        const url = `${this.paypal_endpoint}/v2/checkout/orders`;
        const payload = {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: "110.00",
              },
            },
          ],
        };
      
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(payload),
        });
      
        return this.handleResponse(response);
      };
      
      async captureOrder  (orderID :number) {
        
        const accessToken = await this.generateAccessToken();
        const url = `${this.paypal_endpoint}/v2/checkout/orders/${orderID}/capture`;
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        return this.handleResponse(response);
      };
      
      async  handleResponse(response) {
        try {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
          
          return {
            jsonResponse,
            httpStatusCode: response.status,
          };
        } catch (err) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      }




  // async getAccessToken() {
  //   const auth = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`;
  //   const data = 'grant_type=client_credentials';
  //   return fetch(this.paypal_endpoint + '/v1/oauth2/token', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       "Authorization": `Basic ${Buffer.from(auth).toString('base64')}`,
  //     },
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .catch((err)=>{
  //       console.log(err);
  //     })
  //     .then((json: any) => {
  //       console.log(json);
        
  //       return json.access_token;
  //     })
  // }

  // async getAccessToken() {
  //   try {
  //     const auth = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`;
  //     const data = 'grant_type=client_credentials';
  
  //     const response = await fetch(this.paypal_endpoint + '/v1/oauth2/token', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         Authorization: `Basic QWVteV82S3lBb2ZRMU4zQjZmNzBZRGltbkZRUDYzZDV6TkRSZmFFX0NEV0ZxRDA4RkdWU0gzM2M5QjFUdGNiUWo4TmFFVVRhTXVIRkYwQUw6RUQ5MjVYSWFJMzJaZUJTRmhNTklqbDdMcWVsd2hZbC1DSEhxRF94QW8wdlZnMWo1cHc0QnpfT05uMHZHRFlzbU1KYUtZWmxXa2dnQ0ZiWFA=`,
  //       },
  //       body: data,
  //     });
      
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch access token. Status: ${response.status}`);
  //     }
  
  //     const json = await response.json();
  //     console.log('Response from PayPal:', json);
  
  //     if (!json.access_token) {
  //       throw new Error('Access token not present in the response');
  //     }
  
  //     return json.access_token;
  //   } catch (error) {
  //     console.error('Error fetching access token:', error.message);
  //     throw error;
  //   }
  // }
  

  // async makePayment(amount: number, currency: string) {
  //   const payment = {
  //     intent: 'sale',
  //     payer: {
  //       payment_method: 'paypal',
  //     },
  //     transactions: [
  //       {
  //         amount: {
  //           total: amount,
  //           currency: currency,
  //         },
  //       },
  //     ],
  //     redirect_urls: {
  //       return_url: process.env.API_URL+"/api/paypal/success",
  //       cancel_url: process.env.API_URL+"/api/paypal/cancel",
  //     },
  //   };

  //   return new Promise((resolve, reject) => {
  //     paypal.payment.create(payment, (error, payment) => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(payment.links.find(link => link.rel === 'approval_url').href);
  //       }
  //     });
  //   });
  // }

  // executePayment(paymentId: string, payerId: string): Promise<any> {
  //   const execute_payment_json = {
  //     payer_id: payerId,
  //   };

  //   return new Promise((resolve, reject) => {
  //     paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(payment);
  //       }
  //     });
  //   });
  // }
}

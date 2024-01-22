const Base_url= process.env.NODE_ENV === 'development'?
    'http://localhost:4000' :'';
// const Base_url=''
const Prouducts_url='/api/prouduct';
const user_url='/api/user';
const Orders_url='/api/orders';
const PayPal_url='/api/config/paypal';


export {Base_url,Prouducts_url,user_url,Orders_url,PayPal_url}
 
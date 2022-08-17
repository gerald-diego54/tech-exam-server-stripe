var express = require('express');
var router = express.Router();
var Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_API_KEY);

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'php',
            product_data: {
              name: req.body.amount.product_name,
            },
            unit_amount: req.body.amount.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_FAILED_URL
    });
    
    res.json({ link: session.url });
    
  });

module.exports = router;

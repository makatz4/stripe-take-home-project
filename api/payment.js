const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

module.exports = async (req, res) => {
  // Handle CORS
  await new Promise((resolve) => cors()(req, res, resolve));

  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method Not Allowed' });
  }

  const { items } = req.body;

  try {
    // Create a payment intent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    // Send back the client secret to the frontend
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Return error if something goes wrong
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
};

const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: 'rzp_live_SvBpIw9MqldoLq',  
  key_secret: 'Yove7dusjuZhDXvx3p697mU7'
});

// 1. Create Order
exports.create = async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees
    const options = {
      amount: amount*100,  // Razorpay needs paise (1 rupee = 100 paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Order creation failed' });
  }
};

// 2. Verify Payment (after user pays)
exports.verify = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', 'rzp_live_SvBpIw9MqldoLqs')
    .update(body.toString())
    .digest('hex');
  if (expectedSignature === razorpay_signature) {
    // ✅ Payment is genuine
    // TODO: Update your MySQL order status to 'paid' here
    res.json({ success: true, message: 'Payment verified!' });
  } else {
    // ❌ Payment is fake/tampered
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
};
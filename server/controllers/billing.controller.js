import razorpay from "../config/razorpay.js";
import { Plans } from "../config/plan.js";
import userModel from "../models/user.model.js";

const currency = "inr";

const createOrder = async (req, res) => {
  try {
    const { planType } = req.body;
    const plan = Plans[planType];

    if (!plan || plan.price === 0) {
      return res.status(400).json({
        message: "Invalid paid plan",
      });
    }

    const shortUserId = String(req.user._id).slice(-8);
    const options = {
      amount: plan.price * 100,
      currency: currency.toUpperCase(),
      receipt: `rcpt_${shortUserId}_${planType}`,
      notes: {
        planType,
        userId: req.user._id.toString(),
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      message: "order created",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `some error occured in billing ${error}`,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planType } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !planType) {
      return res.status(400).json({ message: "Missing payment verification fields" });
    }

    const crypto = await import("crypto");
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const plan = Plans[planType];
    if (!plan) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    await userModel.findByIdAndUpdate(req.user._id, {
      plan: plan.plan,
      credits: plan.credits,
    });

    return res.status(200).json({
      message: "Payment verified successfully",
      data: { plan: plan.plan, credits: plan.credits },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Payment verification failed ${error}` });
  }
};

const billingController = { createOrder, verifyPayment };
export default billingController;


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const factory = require('../controllers/handlerFactory');
const AppError = require('../utils/appError');

exports.getCheckoutSession = async (req, res) => {
  const tour = await Tour.findById(req.params.tourId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/my-tours`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    metadata: {
      tourId: tour.id,
      userId: req.user.id,
    },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    session,
  });
};

const createBookingChecout = async session => {
  const { tourId, userId } = session.metadata;
  const existingBooking = await Booking.findOne({
    stripeSessionId: session.id,
  });
  if (existingBooking) return;
  const tour = await Tour.findById(tourId);
  if (!tour) {
    throw new AppError('No Tour found with that id', 404);
  }
  await Booking.create({
    tour: tourId,
    user: userId,
    price: tour.price,
    stripeSessionId: session.id,
    stripePaymentIntentId: session.payment_intent,
  });
};

exports.webhookCheckout = async (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
  if (
    event.type === 'checkout.session.completed' &&
    event.data.object.payment_status === 'paid'
  )
    await createBookingChecout(event.data.object);
  res.status(200).json({ recevied: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      salePrice: String,
      quantity: Number
    },
  ],
  address: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  oderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String
});

module.exports = mongoose.model('Order', OrderSchema);
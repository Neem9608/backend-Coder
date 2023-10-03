// carts.model.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({

  products: [{
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number, default: 1}
  }],

  totals: {
    items: {type: Number, default: 0},
    quantity: {type: Number, default: 0},
    total: {type: Number, default: 0}
  }
  
});

export const cartModel = mongoose.model('Cart', cartSchema);

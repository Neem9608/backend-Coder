// products.models.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true}, 
  price: {type: Number, required: true},
  thumbnail: String,
  code: {type: String, required: true, unique: true},
  stock: {type: Number, required: true},
  category: String
});

productSchema.path('title').validate(title => {
  return title.length > 0; 
}, 'El título es requerido');

export const Product = mongoose.model('Products', productSchema);

export default Product;



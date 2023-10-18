import mongoose from "mongoose";
// import mongoosePaginate from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: 'string',
    last_name: 'string',
    email: {
        type: 'string',
        unique: true
    },
    age: Number,
    password: String, 
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
      },
      role: {
        type: String,
        default: 'user',
      },
    });
    
    const userModel = mongoose.model(userCollection, userSchema);
    
    export { userModel };

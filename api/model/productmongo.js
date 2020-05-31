const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const product = new Schema({
  name:{
      required: [true, 'name is required'],
      type: String,
      minlength:[3, 'Short name '],
      maxlength: [15, 'name has more then 15 characters'],
      unique: [true, 'name is unique']
  },
  description:{ 
     type: String,
     minlength: [10, 'Description has less then 10 letters'],
     maxlength: [150, 'Too much letters']
     
  },
  image:{
    type: String
},

price: {
    type: Number,
    min: [1, 'price has to be more then 1'],
    max: [10000, "price has to be less them 10000"],
    required: [true, 'price is required'],
},
  quantity: {
      type: Number,//int
      min: [1,"quantity has to be more then 1"],
      max: [10, "quantity has to be less them 10"],
      default: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  }
});

product.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});
  module.exports = mongoose.model('product', product)
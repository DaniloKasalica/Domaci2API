const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const user = new Schema({
    username:{
        required: [true, 'username is required'],
        type: String,
        minlength:[3, 'Short username '],
        maxlength: [20, 'username has more then 15 characters'],
        unique: [true, 'username is not unique'],
    },
    password:{
       required: true, 
       type: String
       
    },
    email:{
        required: [true, 'email is required'],
        type: String,
        minlength: [5, 'mail has less then 5 letters'],
        maxlength: [35, 'Too much letters'],
        unique: [true, 'email is not unique'],//nisam siguran sta znaci da bude unique a da ne bude index

    },
    role:{
        type: Number,
        default: 0,

    },
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'product'
    }]
  });
  user.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
  });
  module.exports = mongoose.model('user', user)
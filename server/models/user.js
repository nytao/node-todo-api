
const {mongoose} = require('../db/mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var User = mongoose.model('User', userSchema);

module.exports = {User};

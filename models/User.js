var mongoose = require('mongoose');
var moment = require('moment');

var UserSchema = new mongoose.Schema({

   email: { type: String, lowercase: true},
   password: { type: String, default: ''},
   profile: {
       name: { type: String, default: ''},
       picture: { type: String, default: ''}
   },
   history: [
       {
           paid: {type: Number, default: 0},
           item: {
               type: mongoose.Schema.Types.ObjectId,ref: 'product'
           }
       }
   ],
   address: { type: String, default: ''},
   timestamp: { type: String, default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}

})

module.exports = mongoose.model('user', UserSchema);

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ResSchema = new Schema({
  ResSeanceID: {
    type: String,
  },
  
  ResTicketNumber: {
    type: Number,
  },
  resName:{
      type:String,
  },
  resPrenom:{
    type:String,
},
resEmail:{
    type:String,
},
resTel:{
    type:String,
}

});

module.exports = mongoose.model('Reservation', ResSchema);
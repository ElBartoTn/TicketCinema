'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MovieSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  actors: {
   type : String,
  },
  poster: {
    type: String,
  },
  seance : [{
    seanceDate : String,
    seanceHour : String,
    ticketNumber : Number,
    
     }]
});

module.exports = mongoose.model('Movies', MovieSchema);
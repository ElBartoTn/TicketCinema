'use strict';


var mongoose = require('mongoose'),
Reservation = mongoose.model('Reservation');

exports.list_all_res = function(req, res) {
  Reservation.find({}, function(err, Reservation) {
    if (err)
      res.send(err);
    res.json(Reservation);
  });
};



exports.create_a_res = function(req, res) {
  var new_res = new Reservation(req.body);
  new_res.save(function(err, Reservation) {
    if (err)
      res.send(err);
    res.json(Reservation);
  });
};




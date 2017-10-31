'use strict';


var mongoose = require('mongoose'),
  Movie = mongoose.model('Movies');

exports.list_all_movies = function(req, res) {
  Movie.find({}, function(err, Movie) {
    if (err)
      res.send(err);
    res.json(Movie);
  });
};


exports.read_a_seance = function(req, res) {
    Movie.find({'seance.seanceDate': req.params.seanceDate}, function(err, Movie) {
    if (err)
      res.send(err);
    res.json(Movie);
  });
};

exports.create_a_movie = function(req, res) {
  var new_movie = new Movie(req.body);
  new_movie.save(function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


exports.read_a_movie = function(req, res) {
  Movie.findById(req.params.movieId, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};




exports.addSeance = function(req, res) {
  Movie.findOneAndUpdate({_id:req.params.movieID},
    {$push: {"seance": req.body}},
    {new : true},
    function(err,it) {
        if (err) { return handleError(res, err); }
        if(!it) { return res.send(404); }
        return res.json(200, it);
       }
    );
  };


exports.delete_a_movie = function(req, res) {


  Movie.remove({
    _id: req.params.movieId
  }, function(err, movie) {
    if (err)
      res.send(err);
    res.json({ message: 'movie successfully deleted' });
  });
};

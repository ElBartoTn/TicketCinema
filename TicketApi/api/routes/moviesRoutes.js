'use strict';
module.exports = function(app) {
  var movie = require('../controllers/moviesController');
  app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  // todoList Routes
  app.route('/movies')
    .get(movie.list_all_movies)
    .post(movie.create_a_movie);
 app.route('/movies/:seanceDate')
    .get(movie.read_a_seance);
    
  app.route('/movies/:movieID')
    .get(movie.read_a_movie)
    .put(movie.addSeance)
    
    .delete(movie.delete_a_movie);
};

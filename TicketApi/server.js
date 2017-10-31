var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Movies = require('./api/models/moviesModel'), //created model loading here
Seance = require('./api/models/reservationModel'),
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/movies'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/moviesRoutes'); //importing route
routes(app); //register the route
var routereserv = require('./api/routes/reservationRoutes'); //importing route
routereserv(app)


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

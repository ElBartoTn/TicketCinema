
// create the module and name it budgetApp
var budgetApp = angular.module('budgetApp',  ['ngRoute','ngSanitize','ui.select','moment-picker','ngNumberPicker']);

budgetApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'dashboard.html',
            controller  : 'mainController'
        })
        .when('/Dashboard', {
            templateUrl : 'dashboard.html',
            controller  : 'mainController'
        })
        // route for the depenses page
        .when('/Movieadmin', {
            templateUrl : 'moviesAdmin.html',
            controller  : 'movieAdminCtrl'
            
        })
        .when('/SeanceAdmin', {
            templateUrl : 'seanceAdmin.html',
            controller  : 'seanceAdminCtrl'
            
        })
        .when('/reservAdmin', {
            templateUrl : 'reservAdmin.html',
            controller  : 'reservAdminCtrl'
            
        })

       
});




    // create the controller and inject Angular's $scope
    budgetApp.controller('mainController', function($scope,$http) {

      
        $scope.savereserv=function(reservation){
            
           
                 var a = new Object();
                 a.ResSeanceID = reservation.title;
                 a.ResTicketNumber=reservation.nbrTickets;
                 a.resName=reservation.name;
                 a.resPrenom=reservation.prenom;
                 a.resEmail=reservation.email;
                 a.resTel=reservation.tel;
                 
                 
                 $http.post('http://localhost:3000/reserv', a, {withCredentials: true}).success(function(data) {
                });
     
             
             
           
         };
        
        // create a message to display in our view
        $scope.message = 'Look! I am a dashboard page.!';
       
        $http.get('http://localhost:3000/movies').success(function(data) {
            $scope.movies = data;
            
        }); 
       
        
        $scope.res ={
            name:''

        }
        $('#myCarousel').carousel({
            interval:   4000
        });

         $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
    }

  };
  $(document).ready(function () {
    var options = {
       
    }

    $('#paginator').datepaginator(options);

    $('#paginator').datepaginator();
   
    
    $('#paginator').on('selectedDateChanged', function (event, date) {
        var date1 = new Date(date)
        var thedate = date1.getDate();
        var themonth = date1.getMonth()+1;
        var theyear = date1.getFullYear();
        
        var thedatefinal=theyear+"-"+themonth+"-"+thedate;

        $http.get('http://localhost:3000/movies/'+thedatefinal).success(function(data) {
            $scope.seanceSelecteDate = data;
           
            
        });


    });
});
         
    });

   

            // create a fetch depenses function
           
     budgetApp.controller('movieAdminCtrl', function ($scope, $http) {
      
        $http.get('http://localhost:3000/movies').success(function(data) {
            $scope.movies = data;

            
        }); 

        $scope.saveMovie=function(movie){
           
            
            $http.get('http://www.omdbapi.com/?t='+movie.title+'&apikey=BanMePlz').success(function(data) {
                $scope.movieinfo = data;
                movie.poster=data.Poster;
                movie.actors=data.Actors;
                var a = new Object();
                a.title = movie.title;
                a.poster=movie.poster;
                a.actors=movie.actors;
                $http.post('http://localhost:3000/movies', a, {withCredentials: true}).success(function(data) {
                    $scope.movies.push(data);
               });
    
            }); 
            
          
        };

        $scope.deleteMovie=function(movie){
            $http.delete('http://localhost:3000/movies/'+ movie._id)
            .then(function(response){
                $http.get('http://localhost:3000/movies').success(function(data) {
                    $scope.movies = data;
                    
                }); 



            }); 

        };
        


        
            });
            budgetApp.controller('reservAdminCtrl', function($scope,$http) {

                $scope.reserv=[];
                $http.get('http://localhost:3000/reserv').success(function(data) {
                    $scope.reserv = data;
                   
                    
                }); 


            });
            
            budgetApp.controller('seanceAdminCtrl', function($scope,$http) {
                $scope.moviesSeance=[];
                $http.get('http://localhost:3000/movies').success(function(data) {
                    $scope.moviesSeance = data;
                   
                    
                }); 
              
                $scope.seance = {
                    filmID: '',
                    seanceDate:'',
                    seanceHour:'',
                    ticketNumber:''
                }
                $scope.saveseance=function(seance){
               
                var a = new Object();
                a.movieID = seance.filmID;
                alert(a.movieID);
                a.seanceDate=seance.date;
                
                a.seanceHour=seance.time;
                a.ticketNumber=seance.nbrTickets;
                $http.put('http://localhost:3000/movies/'+a.movieID, a, {withCredentials: true}).success(function(data) {
               
                    $http.get('http://localhost:3000/movies').success(function(data) {
                        $scope.moviesSeance = data;
                       
                    }); 

                    $scope.seance = {
                        filmID: '',
                        seanceDate:'',
                        seanceHour:'',
                        ticketNumber:''
                    }
            });
                
               
            };
            
                $('.datepicker').datepicker();
                $('#timepicker4').timepicker({
                    minuteStep: 1,
                    secondStep: 5,
                    showInputs: false,
                    template: 'modal',
                    modalBackdrop: true,
                    showSeconds: true,
                    showMeridian: false
                });
                
              
                
                $http.get('http://localhost:3000/movies').success(function(data) {
                    $scope.movies = data;
                    
                }); 

                $scope.deleteseance=function(seance){
                    $http.delete('http://localhost:3000/seance/'+ seance._id)
                    .then(function(response){
                        $http.get('http://localhost:3000/seance').success(function(data) {
                            $scope.seance = data;
                            
                        }); 
        
        
        
                    }); 
        
                };


            });
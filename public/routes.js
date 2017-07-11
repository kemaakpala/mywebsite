//Routes
mywebsiteApp.config(function ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/index', {
      templateUrl: 'pages/home.htm',
      controller: 'homeController'
    })
    .when('/', {
      templateUrl: 'pages/home.htm',
      controller: 'homeController'
    })
   .otherwise({ redirectTo: '/index' });
    $locationProvider.html5Mode(true);

});

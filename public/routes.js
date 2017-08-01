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
    .when('/blog', {
      templateUrl: 'pages/blog.htm',
      controller: 'blogController'
    })
    .when('/admin',{
      templateUrl: 'admin/index.htm',
      controller: 'adminController'
    })
   .otherwise({ redirectTo: '/index' });
    $locationProvider.html5Mode(true);
});

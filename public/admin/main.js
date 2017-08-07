//Module 
var mywebsiteAdminApp = angular.module('mywebsiteAdminApp', ['ngRoute', 'ngResource', 'ngMessages', 'ngAnimate']);
mywebsiteAdminApp.controller('adminController',
  [
    '$scope', '$log', '$resource',' $location'
    , function ($scope, $log, $resource, $location) {
        console.log('admin controller called!!');
        $scope.test = 'test';
    }
  ]
);
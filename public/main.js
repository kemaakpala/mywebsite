//Module
var mywebsiteApp = angular.module('mywebsiteApp', ['ngRoute', 'ngResource', 'ngMessages', 'ngAnimate', 'uiGmapgoogle-maps', 'mgcrea.ngStrap']);

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

//googlemaps
mywebsiteApp.config(function (uiGmapGoogleMapApiProvider){
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyB1T4AsvI4eSWFSlpNgm3wSnmRSllj-Bqw',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
});

//services
mywebsiteApp.service('contactService', function(){
   this.firstname = '';
   this.lastname = '';
   this.email = '';
   this.subject = '';
   this.message = '';
   this.success = false;
});

//controllers
mywebsiteApp.controller('homeController',
  [
    '$scope','$log', '$resource', '$location', 'contactService', 'uiGmapGoogleMapApi',
    function($scope, $log, $resource, $location, contactService, uiGmapGoogleMapApi){
      $scope.submitted = false;
      $scope.success = contactService.success;
      $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
      $scope.successMsg = null;
      $scope.errorMsg = null;
      $scope.map = { center: { latitude: 51.574653, longitude:-0.414034 }, zoom: 14 };
      $scope.showParticles = true;
      
      //console.log(contactService.firstname);
      $scope.firstname = contactService.firstname;
      $scope.lastname = contactService.lastname;
      $scope.email = contactService.email;
      $scope.subject = contactService.subject;
      $scope.message = contactService.message;

      $scope.$watch('firstname', function(){
         contactService.firstname = $scope.firstname;
         //console.log(contactService.firstname);
      });

      $scope.$watch('lastname', function(){
         contactService.lastname = $scope.lastname;
      });
      $scope.$watch('email', function(){
         contactService.email = $scope.email;
      });
      $scope.$watch('subject', function(){
         contactService.subject = $scope.subject;
      });
      $scope.$watch('message', function(){
         contactService.message = $scope.message;
      });

      $scope.submit = function(isValid){
         //console.log(isValid);
          if(!isValid){
            $scope.errorMsg = "Oops! There's been an error. Please review and try again."; 
            $scope.successMsg = null
            return false
          }else{
            $scope.errorMsg = null;
            $scope.postURL = location.protocol+'//'+location.host+'/api/mywebsitemessage/:id';
            
            var Contacts = $resource(
              $scope.postURL,
              { id: '@id' },
              {
                contact: {
                  method: 'POST',
                  params:{ firstname: '', lastname: '', email: '', subject: '', message: '' }
                }
              }
            );

            //create newContact
            var newContact = new Contacts();
            newContact.firstname = contactService.firstname;
            newContact.lastname = contactService.lastname;
            newContact.email = contactService.email;
            newContact.subject = contactService.subject;
            newContact.message = contactService.message;
            
            //save newContact
            newContact.$save(function(contact){
              $scope.success = true;
              $scope.successMsg = "Thank you very much for getting in touch. I strive to get back to you in a space of 24 hrs.";
            });
          }

         };

    }
  ]
);

// mywebsiteApp.controller('particlesController', ['$scope', function($scope){
//   $scope.showParticles = true;
// }]);

//directives
mywebsiteApp.directive('contactForm', function(){
  return {
    restrict: 'EA',//EACM
    templateUrl: 'directives/contact.htm',
    replace: true, //, //false does not remove custom tag from html
    //scope: {
      //isolated scope directive cannot directly affect what's going on in its parent page

    //}
  }
});

mywebsiteApp.directive('googleMap', function(){
  return {
    restrict: 'EA',//EACM
    templateUrl: 'directives/map.htm',
    replace: true, //, //false does not remove custom tag from html
    //scope: {
      //isolated scope directive cannot directly affect what's going on in its parent page

    //}
  }
});

mywebsiteApp.directive('particlesJs',  particlesDirective);

function particlesDirective (){
  return {
    restrict: 'A',
    tempalte: '<div class="row" id="particles-js"></div>',
    link: function(scope, element, attrs, fn){
      //$log.debug('test');
      particlesJS('particleJs', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#FFFFFF'
          },
          shape: {
            type: "circle",
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 5,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  };
}
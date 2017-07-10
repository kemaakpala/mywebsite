//Module 
var mywebsiteApp = angular.module('mywebsiteApp', ['ngRoute', 'ngResource', 'ngMessages', 'ngAnimate', 'mgcrea.ngStrap', 'vcRecaptcha']);

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

//services
mywebsiteApp.service('contactService', function(){
   this.firstname = '';
   this.lastname = '';
   this.email = '';
   this.subject = '';
   this.message = '';
   this.success = false;
});

//controllers ,
mywebsiteApp.controller('homeController',
  [
    '$scope','$log', '$resource', '$location', 'contactService', 'vcRecaptchaService', '$modal',
    function($scope, $log, $resource, $location, contactService, vcRecaptchaService, $modal){
      //skills
      $scope.getURL = location.protocol + '//' + location.host + '/api/myskills/';
      console.log($scope.getURL);
      $scope.myskillsApi = $resource($scope.getURL);

      $scope.myskillsResult = $scope.myskillsApi.query();
      
      //contact
      $scope.submitted = false;
      $scope.success = contactService.success;
      $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
      $scope.successMsg = null;
      $scope.errorMsg = null;
      $scope.map = { center: { latitude: 51.574653, longitude:-0.414034 }, zoom: 14 };
      $scope.showParticles = true;
      $scope.debugMode = false;

      //recaptcha
      $scope.response = null;
      $scope.widgetId = null;

      $scope.model = {
        key: '6LdJQSYUAAAAAE01Dh8EcUbtFM0T4TxJksn8ugw-' //Site key
      };
      console.log($scope.model.key.length);
      $scope.setResponse = function (response) {
        console.info('Response available');
        $scope.response = response;
      };
      $scope.setWidgetId = function (widgetId) {
        console.info('Created widget ID: %s', widgetId);
        $scope.widgetId = widgetId;
      };
      $scope.cbExpiration = function () {
        console.info('Captcha expired. Resetting response object');
        vcRecaptchaService.reload($scope.widgetId);
        $scope.response = null;
      };

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
        
        $log.info(isValid);
        $log.info(contactForm.gRecaptchaResponse);
        $log.info($scope.gRecaptchaResponse);
        $log.info(contactForm.valid);

          if(!isValid){
            $scope.errorMsg = "Oops! There's been an error. Please review and try again."; 
            $scope.successMsg = null

            // In case of a failed validation you need to reload the captcha
            // because each response can be checked just once
            vcRecaptchaService.reload($scope.widgetId);

            return false
          }else{
           $scope.verifyURL =  'https://www.google.com/recaptcha/api/siteverify';
           
           var VerifyContact = $resource(
              $scope.verifyURL,
              {},
              {
                recaptchaAction: {
                  method: 'POST',
                  params:{
                    secret: '6LdJQSYUAAAAABhhQa0ILQt2TCWqsvNIfJfjal1o',
                    response: $scope.gRecaptchaResponse
                  }
                }
              }
            );

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
              $scope.errorMsg = null;
              $scope.success = true;
              $scope.successMsg = "Thank you very much for getting in touch. I strive to reply all queries in a space of 24 hrs.";
              var successModal = $modal({
                title: 'Thank You', 
                templateUrl:'/directives/templates/modal.tpl.html', 
                content: $scope.successMsg, 
                show:true, 
                animation: 'am-fade'
              });

              //send email
              
              //reset email values
              $scope.firstname = '';
              $scope.lastname = '';
              $scope.email = '';
              $scope.subject = '';
              $scope.message = '';
              $scope.contactForm.$setPristine();
              $scope.contactForm.$setUntouched();
              $scope.success = false;
              $scope.submitted = false;
              vcRecaptchaService.reload($scope.widgetId);
            });
          }

         };

    }
  ]
);

//directives
mywebsiteApp.directive('contactForm', function(){
  return {
    restrict: 'EA',//EACM
    templateUrl: 'directives/contact.htm',
    replace: true //, //false does not remove custom tag from html
    //scope: {
      //isolated scope directive cannot directly affect what's going on in its parent page

    //}
  }
});

mywebsiteApp.directive('googleMap', function(){
  return {
    restrict: 'EA',//EACM
    templateUrl: 'directives/map.htm',
    replace: true //, //false does not remove custom tag from html
    //scope: {
      //isolated scope directive cannot directly affect what's going on in its parent page

    //}
  }
});

mywebsiteApp.directive('particleJs', function(){
  return {
    restrict: 'E',
    template: '<div class="row" id="particles-js"></div>',
    replace: true,
    link: function(scope, element, attrs, fn){
      var particleJSON = {
        "particles": {
          "number": {
            "value": 160,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 1,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 4,
              "size_min": 0.3,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 600
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "bubble"
            },
            "onclick": {
              "enable": false,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 250,
              "size": 0,
              "duration": 2,
              "opacity": 0,
              "speed": 3
            },
            "repulse": {
              "distance": 400,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      };
      particlesJS("particles-js", particleJSON, function () {
        console.log('callback - particles.js cofig loaded');
      });
    }
  }
});
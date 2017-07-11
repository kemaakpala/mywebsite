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
            $scope.postEmailURL = location.protocol+'//'+location.host+'/api/sendEmail';
            console.log($scope.postEmailURL);
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

            var ContactEmail = $resource(
              $scope.postEmailURL,
              {},
              { 
                contactEmail: {
                  method: 'POST',
                  params: { firstname: '', lastname: '', email: '', subject: '', message: '' }
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
            
            var newContactEmail = new ContactEmail();
            newContactEmail.firstname = contactService.firstname;
            newContactEmail.lastname = contactService.lastname;
            newContactEmail.email = contactService.email;
            newContactEmail.subject = contactService.subject;
            newContactEmail.message = contactService.message;

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

            newContactEmail.$save(function(contactEmail){ console.log('email sent');});
          }

         };

    }
  ]
);
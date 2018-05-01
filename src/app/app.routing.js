(function () {
  var app = angular.module('desafio'),
    states = {

      styleguide: {
        name: 'styleguide',
        url: '/styleguide',
        templateUrl: './src/app/components/pages/styleguide/styleguide.page.html',
        controller: 'StyleguideController'
      }
      // ,

      // styleguideState: {
      //   name: 'styleguide',
      //   url: '/styleguide/?:serviceId',
      //   templateUrl: './src/app/components/pages/styleguide/styleguide.page.html',
      //   controller: 'StyleguideController'
      // }

    },

    routerConfiguration = ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state(states.styleguide);
        // .state(states.styleguideState);

      $urlRouterProvider.otherwise('/styleguide');
    }];

  app.config(routerConfiguration);

})();

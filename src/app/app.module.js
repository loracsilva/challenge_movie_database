(function() {
  var moduleDependencies = [
    'ui.router',
    'pages',
    'molecules',
    'atoms'
  ];

  angular.module('desafio', moduleDependencies);

  angular.element(function() {
    angular.bootstrap(document, ['desafio']);
  });
}());

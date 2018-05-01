(function() {
  function patternInput() {
  var templateType;
    return {
      restrict: 'AE',
      transclude: true,
      scope: {
        type: '=ngType',
        class: '=ngClass',
        name: '=ngName',
        valid: '=ngValid',
        icon: '@'
      },
      link: function (scope, elemento, attrs) {
        scope.placeholder = String(attrs.placeholder);
        scope.mask = String(attrs.mask || '');
        scope.icon = attrs.ngIcon;        
      },
      templateUrl: "./src/app/components/atoms/input/input.directive.html",
    }
  }

  angular.module('atoms')
    .directive('genericInput', patternInput);
}());

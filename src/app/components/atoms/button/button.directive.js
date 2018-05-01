(function () {
  angular.module('atoms')
    .directive('genericButton', genericButton);

  function genericButton() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        click: '&',
        icon: '@',
        state: '@'
      },
      templateUrl: function (elem, attrs) {
        var path = './src/app/components/atoms/button/';

        if (attrs.type) {
          return path + 'button-' + attrs.type + '.directive.html';
        } else {
          return path + 'button-primary.directive.html';
        }
      },
      link: function (scope, element, attrs) {
        scope.disabled = attrs.disabled !== undefined;
      }
    }
  }
})();

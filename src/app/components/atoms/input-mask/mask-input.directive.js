/**
 *  maskInput.directive.js
 *  more info: https://igorescobar.github.io/jQuery-Mask-Plugin/
 */

(function() {
  function maskInput() {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function ($scope, element, attrs, $interval) {           
        var timeout = setInterval(function () {
          element.mask(String(attrs.mask));
        }, 500); 
      }
    }
  }

  angular.module('atoms')
    .directive('maskInput', maskInput);
}());
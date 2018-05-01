(function () {
  angular.module('atoms')
    .directive('genreDropdown', genreDropdown);

  genreDropdown.$inject = ['$filter', '$timeout', '$http', '$stateParams'];

  function genreDropdown($filter, $timeout, $http, $stateParams) {
    return {
      restrict: 'E',
      scope: {
        selectedItem: '=ngModel',
        // listItens: '=',
        label: '@',
        orderBy: '@',
        placeholder: '@',
        ngChange: '&',
        text: '@'
      },
      templateUrl: './src/app/components/atoms/dropdown/dropdown.directive.html',
      link: function (scope, elem, attrs) {
        scope.showDropdown = false;
        scope.reverseOrder = scope.reverseOrder || false;
        scope.disabled = attrs.disabled !== undefined;
        scope.listItens = [];
        listItens();

        function listItens() {
          var userLang = navigator.language || navigator.userLanguage;
          $http({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=bc7aff7c3e4cd31438852dcac726059e&language='+userLang+''
          }).then(function onSuccess(data) {
            scope.listItens = data.data.genres;
          }, function onError(data) {
            console.log(data);
          });
        }

        scope.changeModel = function (value) {
          scope.selectedItem = value;
          if (scope.ngChange) {
            $timeout(function () {
              scope.ngChange();
            });
          }
        };

        scope.$watch('listItens', function (value) {
          if (value) {
            var list = scope.listItens,
              order = scope.orderBy,
              reverse = scope.reverseOrder;

            scope.listItensFiltered = order ? filter('orderBy')(list, order, reverse) : list;

            if (scope.listItensFiltered.length === 1) {
              scope.changeModel(scope.listItensFiltered[0]);
            }
          }
        });

        scope.$watch('selectedItem', function (value) {
          scope.selectedItem = value;
          var idGenre = scope.selectedItem.id;
          console.log(value);
          //genreValue(idGenre);
          $stateParams.idGenre;
        });

        scope.toggleDropdown = function () {
          scope.showDropdown = !scope.showDropdown;
        };

        scope.hideDropdown = function () {
          scope.showDropdown = false;
        };

        scope.isValid = function () {
          scope.required = attrs.required;
          return !(attrs.required && !scope.selectedItem);
        };

        scope.getLabel = function (obj, exp) {
          return obj ? scope.$eval(exp, obj) : null;
        };
        
      }
    };
  }
})();

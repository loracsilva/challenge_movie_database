(function () {
  angular.module('pages')
    .controller('StyleguideController', StyleguideController);

  StyleguideController.$inject = ['$scope', '$http'];

  function StyleguideController($scope, $http, $stateParams) {
    var userLang = navigator.language || navigator.userLanguage;
    var apikey = 'bc7aff7c3e4cd31438852dcac726059e';
    var page = 1;

    $scope.movies = [];
    $scope.pages = [];
    $scope.atualPage = [];
    $scope.genereID = '';
    listItens();

    function listItens(){
      $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie?api_key=' + apikey + '&language=' + userLang + '&page=' + page
      }).then(function onSuccess(results) {
        $scope.movies = results.data.results;
        $scope.pages = results.data.results.total_pages;
        $scope.atualPage = results.data.results.page;
      }, function onError(data) {
        console.log(data);
      });
    }

    function genreValue(idGenre) {
      var genre_id = idGenre;
      $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/genre/' + genre_id + '/movies?api_key=bc7aff7c3e4cd31438852dcac726059e&language=en-US&include_adult=false&sort_by=created_at.asc'
      }).then(function onSuccess(data) {
        console.log(data.data.results);
      }, function onError(data) {
        console.log(data);
      });
    };
  }
})();

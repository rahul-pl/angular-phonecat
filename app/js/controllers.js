'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.sliceStart = parseInt($routeParams.sliceStart);
    var sliceLength = 3;
    $scope.shift = 2;

    $scope.phones = Phone.queryLimited($scope.sliceStart, sliceLength);
    $scope.phones.$promise.then(function(data) {
      $scope.sliceStart = data.offset;
      $scope.loadPrevVisibility = !data.reachedTop;
      $scope.loadMoreVisibility = !data.reachedBottom;
    });

    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

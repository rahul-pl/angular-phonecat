'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    var sliceStart = 0;
    var sliceLength = 3;
    var shift = 2;

    var makeQuery = function()
    {
      $scope.phones = Phone.queryLimited(sliceStart, sliceLength);
      $scope.phones.$promise.then(function(data) {
        sliceStart = data.offset;
      });
    }

    makeQuery();

    $scope.loadPrev = function() {
      sliceStart -= shift;
      makeQuery();
    }
    $scope.loadMore = function() {
      sliceStart += shift;
      makeQuery();
    }
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

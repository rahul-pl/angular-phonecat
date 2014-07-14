'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.sliceStart = 0;
    var SLICE_LENGTH = 3;
    var SHIFT = 2;

    var makeQuery = function(offset) {
      $scope.phones = Phone.queryLimited(offset, SLICE_LENGTH);
      $scope.phones.$promise.then(function(data) {
        $scope.sliceStart = offset;
        $scope.isLoadPrevEnabled = ($scope.sliceStart > 0);
        $scope.isLoadMoreEnabled = ($scope.sliceStart + SLICE_LENGTH < data.size);
      });
    }

    makeQuery($scope.sliceStart);

    $scope.loadPrev = function() {
      disableFurtherLoading();
      makeQuery($scope.sliceStart - SHIFT);
    }
    $scope.loadMore = function() {
      disableFurtherLoading();
      makeQuery($scope.sliceStart + SHIFT);
    }

    var disableFurtherLoading = function() {
      $scope.isLoadPrevEnabled = false;
      $scope.isLoadMoreEnabled = false;
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

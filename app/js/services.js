'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource', function($resource) {
    var phoneService = $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
    return {
      query: phoneService.query,
      get: phoneService.get,
      queryLimited: function(offset, limit) {
        var response = phoneService.query();
        response.$promise.then(function(data) {
          data.size = data.length;
          data.splice(0, offset);
          data.splice(limit, data.length);
        })
        return response;
      }
    }
  }]);

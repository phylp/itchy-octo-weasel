require(__dirname + '/../../app/js/client');
require('angular-mocks');



describe('logs controller', function(){

  var $httpBackend;
  var $ContollerConstructor;
  var $scope;

  beforeEach(angular.mock.module('foodApp'));
  
  beforeEach(angular.mock.inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $ContollerConstructor = $controller;
  }));

  it('should be able to create a controller', function(){
    var controller = new $ContollerConstructor('LogsController', {$scope:$scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.logs)).toBe(true);
  });

  describe('API requests', function(){
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope){
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ContollerConstructor('LogsController', {$scope:$scope})
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to make a request for data', function(){
      $httpBackend.expectGET('/logger/showlogs').respond(200, [{restaurant: 'McDonalds'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.logs[0].restaurant).toBe('McDonalds');
    })

    it('should be able to make a new log', function(){
      $httpBackend.expectPOST('/logger/send', {restaurant: 'Taco Bell', item: 'Chalupa'}).respond(200, {_id: 1, restaurant: 'Taco Bell', item: 'Chalupa'});
      $scope.makeLog({restaurant: 'Taco Bell', item: 'Chalupa'})
      $httpBackend.flush();
      expect($scope.logs[0].restaurant).toBe('Taco Bell');
    });

    it('should be able to modify a log', function(){
      $scope.logs[0] = {_id: 1, restaurant: 'Mcdonalds', item:'Fries'};
      $httpBackend.expectPUT('/logger/update', {_id: 1, restaurant: 'Taco Bell', item:'Frito Burrito'}).respond(200, {_id: 1, restaurant: 'Taco Bell', item:'Frito Burrito'});
      $scope.updateLog({_id: 1, restaurant: 'Taco Bell', item:'Frito Burrito'});
      $httpBackend.flush();
      expect($scope.logs.length).toBe(1);
      expect($scope.logs[0].restaurant).toBe('Taco Bell');
    });

    it('should be able to delete a log', function(){
      $scope.logs.push({_id: 727, restaurant: 'Hardees', item: 'coke'});
      $httpBackend.expectDELETE('/logger/727').respond(200);
      $scope.removeLog({_id: 727, restaurant: 'Hardees', item: 'coke'});
      $httpBackend.flush();
      expect($scope.logs.length).toBe(0);
    })

  }); 

});





// describe('logs controller', function(){
//   it('should run a test', function(){
//     expect(true).toBe(true);
//   });
// });
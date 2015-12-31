'use strict';

describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));
  beforeEach(module('myApp.services'));

  describe('view2 controller', function(){
	var scope, ctrl;
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('View2Ctrl', {$scope: scope});
	}));

    it('should be defined', inject(function($controller) {
      //spec body
      expect(ctrl).toBeDefined();
    }));

  });
});
var mocha         = require('mocha')
  , chai          = require('chai')
  , sut           = require('../lib/<%= name %>')
  , expect        = chai.expect
  ;


describe('<%= name %>', function() {

  describe('#test', function() {
    it('should return 1', function() {
      var result = sut.test();
      expect(result).to.equal(1);
    });
  });

});
var User = require('../../models/user.js');

describe('User', function(){
  describe('#save()', function(){
    it('should save without error', function(done){
      var user = new User({name: 'Luna', password: 'password'});
      user.save(done);
    })
  })
})

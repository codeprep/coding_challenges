var should = require('should');
var vm = require('vm');
var fs = require('fs');

// if this test is being run on a server it should be ONLY to test the
// provided solutions
if(typeof window === 'undefined'){
  // looks for a file with the same name as this one but with
  // `.test.js` replaced with `.js`
  var filename = __filename.replace(/\.test\.js$/, '.js');
  vm.runInThisContext(fs.readFileSync(filename), filename);
}

describe('createAnagrams', function() {
  it('should exist', function(){
    should.exist(createAnagrams);
  });

  it('should be a function', function() {
    createAnagrams.should.be.a.Function;
  });

  it('should return an array', function() {
    var result = createAnagrams('hello');
    should.exist(result);
    result.should.be.an.instanceof(Array);
  });

  it('should return an array with a single character', function(){
    var result = createAnagrams('a');
    result.should.be.eql(['a']);
  });

  it('should return an array of anagrams that contains `lives` for input `elvis`', function(){
    var result = createAnagrams('elvis');
    var found = result.indexOf('lives') !== -1;
    found.should.be.true;
  });

  it('should return an array of anagrams that contains `badcredit` for input `debitcard`', function(){
    var result = createAnagrams('debitcard');
    var found = result.indexOf('badcredit') !== -1;
    found.should.be.true;
  });

  it('should return all anagrams for \'ab\'', function(){
    var expected = ['ab', 'ba'];
    var result = createAnagrams('ab');
    var item, found = false;
    for(var i = 0; i < expected.length; i++){
      item = expected[i];
      found = result.indexOf(item) !== -1;
      found.should.be.true;
    }
  });

  it('should return all anagrams for \'abc\'', function(){
    var expected = ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'];
    var result = createAnagrams('abc');
    result.sort().should.be.eql(expected);
    var item, found = false;
    for(var i = 0; i < expected.length; i++){
      item = expected[i];
      found = result.indexOf(item) !== -1;
      found.should.be.true;
    }
  });

  it('should return all anagrams for \'apps\'', function() {
    var expected = [ 'apps', 'apsp', 'aspp', 'paps', 'pasp', 'ppas'
      , 'ppsa', 'psap', 'pspa', 'sapp', 'spap', 'sppa' ];
    var result = createAnagrams('apps');
    var item, index, found = false;
    for(var i = 0; i < expected.length; i++){
      item = expected[i];
      found = result.indexOf(item) !== -1;
      found.should.be.true;
    }
  });

  it('should return all __unique__ anagrams for \'apps\'', function() {
    // if you've gotten this far, you're doing awesome. this last test
    // is to check if you're returning an anagram array without duplicates
    var expected = [ 'apps', 'apsp', 'aspp', 'paps', 'pasp', 'ppas', 'ppsa'
      , 'psap', 'pspa', 'sapp', 'spap', 'sppa' ];
    var match = true;
    var result = createAnagrams('apps');
    result.length.should.be.equal(expected.length);
  });

  it('should not use underscore\'s `uniq`', function(){
    // this just checks your code for any usage of `_.uniq`
    // NOTE: this test _might_ still fail even if you technically don't use
    // `_.uniq` (ie., if you hae commented out code that still references
    // `_.uniq` in your solution.)
    var usesUniq = createAnagrams.toString().match(/\s*_\.uniq/) === null;
    usesUniq.should.be.true;
  })
});

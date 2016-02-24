var assert = require('assert');
var ukan = require('./ukan.js');

/*
 * 1) Logic-style Variables & Substitutions.
 *
 * Logic variables start out 'fresh', later they may gain an association with
 * values or with other variables which may or may not be fresh.
 *
 * We use a simple object to store substitutions, with ES6 "Symbols" as the
 * keys to act as our logic, variables.
 *
 * Note - the variable only becomes part of the substitution once it has an
 * association.
 *
 */

console.log("\n1) Logic-style Variables & Substitutions\n");

// 1.1) a VERY basic test that says we can create a fresh logic variable 
(function can_create_fresh_logic_variables(){
    var x = ukan.fresh();

    assert(x);

    console.log("1.1 Passed :)");
})();

// 1.2) when we lookup a fresh variable that has no association in a given
// substitution, then the fresh variable is simply returned.
(function can_extend_a_substitution_with_new_association(){
    var x = ukan.fresh();
    var res = ukan.lookup(ukan.emptyS(), x); 
    
    assert.strictEqual(x, res);

    console.log("1.2 Passed :)");
})();

// 1.3) we can extend a substitution with a new association to a value
(function can_extend_a_substitution_with_new_association(){
    var x = ukan.fresh();
    var s1 = ukan.extend(ukan.emptyS(), x, "value"); 
    var res = ukan.lookup(s1, x);
    
    assert.strictEqual(res, "value");

    console.log("1.3 Passed :)");
})();

// 1.4) for the sake of functional niceness, lets make extend reutnr a new
// substitution rather than mutating an existing one 
(function extend_returns_a_new_substitution(){
    var x = ukan.fresh();
    var emptyS = ukan.emptyS();
    var s1 = ukan.extend(emptyS, x, "value"); 
    
    assert.notEqual(s1, emptyS);

    console.log("1.4 Passed :)");
})();

// 1.5) we can associate logic variables with other logic variables
// <hint> recursion is the friend of the logic programmer...
(function can_associate_variables_with_other_variables(){
    var x = ukan.fresh();
    var y = ukan.fresh();
    var s1 = ukan.extend(ukan.emptyS(), x, y); 
    var res = ukan.lookup(s1, x);
    
    assert.strictEqual(res, y);

    console.log("1.5 Passed :)");
})();

// 1.6 (bonus!), if you have implemented 1.5 in a recursive way, then
// this should come for free... 
(function can_associate_follow_a_chain_of_associations(){
    var x = ukan.fresh();
    var y = ukan.fresh();
    var z = ukan.fresh();
    var s1 = ukan.extend(ukan.emptyS(), x, y); 
    var s2 = ukan.extend(s1, y, z); 
    var s3 = ukan.extend(s2, z, "chain-tastic!"); 
    var res = ukan.lookup(s3, x);
    
    assert.strictEqual(res, "chain-tastic!");

    console.log("1.6 (bonus!) Passed :)");
})();

console.log( "\n1) Complete!");

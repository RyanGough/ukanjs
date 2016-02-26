var assert = require('assert');
var ukan = require('./ukan.js');

/*
 * 1) Logic-style Variables & Substitutions.
 *
 * Logic variables start out 'fresh', later they may gain an association with
 * values or with other variables which may or may not be fresh. We use ES6
 * 'Symbols' to represent logic variables.
 *
 * We use a simple object to store substitutions where the keys are logic 
 * variables and the values the associations. We 'extend' a  substitution
 * to add a new association. emptyS() returns an empty substitution.
 *
 * We can 'lookup' a variable in a substitution to find its associated value.
 * This may involve following a series of associations. If a variable does 
 * not have an association in a substitution it is simply returned.
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
(function looking_up_var_with_no_association_returns_var(){
    var x = ukan.fresh();
    var res = ukan.lookup(ukan.emptyS(), x); 
    
    assert.strictEqual(x, res);

    console.log("1.2 Passed :)");
})();

// 1.3) when we lookup a value in a substitution the value is simple returned. 
(function looking_up_value_returns_value(){
    var res = ukan.lookup(ukan.emptyS(), 4454); 
    
    assert.strictEqual(res, 4454);

    console.log("1.3 Passed :)");
})();

// 1.4) we can extend a substitution with a new association to a value
(function can_extend_a_substitution_with_new_association(){
    var x = ukan.fresh();
    var s1 = ukan.extend(ukan.emptyS(), x, "value"); 
    var res = ukan.lookup(s1, x);
    
    assert.strictEqual(res, "value");

    console.log("1.4 Passed :)");
})();

// 1.5) for the sake of functional niceness, lets make extend return a new
// substitution rather than mutating an existing one 
(function extend_returns_a_new_substitution(){
    var x = ukan.fresh();
    var emptyS = ukan.emptyS();
    var s1 = ukan.extend(emptyS, x, "value"); 
    
    assert.notEqual(s1, emptyS);

    console.log("1.5 Passed :)");
})();

// 1.6 we can associate a variable with another variable, and lookup
// will follow the chain of associations (hint: recursion is your
// friend)
(function can_associate_follow_a_chain_of_associations(){
    var x = ukan.fresh();
    var y = ukan.fresh();
    var s1 = ukan.extend(ukan.emptyS(), x, y); 
    var s2 = ukan.extend(s1, y, "chain-tastic!"); 
    var res = ukan.lookup(s2, x);
    
    assert.strictEqual(res, "chain-tastic!");

    console.log("1.6 Passed :)");
})();

console.log( "\n1) Complete!");

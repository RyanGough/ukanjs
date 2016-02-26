var assert = require('assert');
var ukan = require('./ukan.js');

/*
 * 3) The Logic Engine!
 * 
 * Now we can start to build more complex goals. In order to do this
 * we will need to create some ways of combining goals, namely
 * disjunction (logical OR) and conjunction (logical AND).
 *
 * THe first logic method we will create 
 *
 */

console.log("\n3) The Logic Engine!\n");

// 3.1) the disjunction goal will fail if both goals fail
(function success_returns_a_list_of_the_input_substitution(){
    var s = ukan.emptyS();
    var goal = ukan.disj(ukan.fail, ukan.fail);
    var res = goal(s);

    assert.strictEqual(res.length, 0);

    console.log("3.1 Passed :)");
})();

// 3.2 the disjunction goal will succeed so long as one input succeeds
(function success_returns_a_list_of_the_input_substitution(){
    var s = ukan.emptyS();
    var x = ukan.fresh();
    var goal = ukan.disj(ukan.unify(x,"hello"), ukan.fail);
    var res = goal(s);

    assert.strictEqual(res.length, 1);
    assert.strictEqual(ukan.lookup(res[0], x), "hello");

    console.log("3.2 Passed :)");
})();

console.log( "\n3) Complete!");

var assert = require('assert');
var ukan = require('./ukan.js');

/*
 * 3) Goal Combinators
 * 
 * In order to build more complex goals we will need the ability to
 * combine them in ways similar to logical OR and AND..
 *
 * Disjunction (OR) is straightforward and simply appends the results of one
 * goal to another. So long as one goal doesn't fail (return a non-empty
 * list of substitutions) the disjunction will not fail.
 * 
 * Conjunction (AND) is implemented as a composition of the two goals,
 * i.e. the output of the first becomes the input to the latter. Thus
 * it will fail if either of the goals fails.
 *
 */

console.log("\n3) Goal Combinators\n");

// 3.1) the disjunction goal will fail if both goals fail
(function disj_fails_if_both_goals_fail(){
    var s = ukan.emptyS();
    var goal = ukan.disj(ukan.fail, ukan.fail);
    var res = goal(s);

    assert.strictEqual(res.length, 0);

    console.log("3.1 Passed :)");
})();

// 3.2 the disjunction goal will succeed so long as one input succeeds
(function disj_succeeds_if_one_goal_succeeds(){
    var s = ukan.emptyS();
    var x = ukan.fresh();
    var goal = ukan.disj(ukan.unify(x,"hello"), ukan.fail);
    var res = goal(s);

    assert.strictEqual(res.length, 1);
    assert.strictEqual(ukan.lookup(res[0], x), "hello");

    console.log("3.2 Passed :)");
})();

// 3.3 the disjunction goal can return many substitutions if both goals
// succeed
(function disj_can_return_more_than_one_substituton(){
    var s = ukan.emptyS();
    var x = ukan.fresh();
    var goal = ukan.disj(ukan.unify(x,"hello"), ukan.unify(x,"goodbye"));
    var res = goal(s);

    assert.strictEqual(res.length, 2);
    assert.strictEqual(ukan.lookup(res[0], x), "hello");
    assert.strictEqual(ukan.lookup(res[1], x), "goodbye");

    console.log("3.3 Passed :)");
})();

// 3.4 the conjunction goal fails if one goal fails
(function conj_fails_if_either_goal_fails(){
    var s = ukan.emptyS();
    var x = ukan.fresh();
    var goal = ukan.conj(ukan.unify(x,"hello"), ukan.fail);
    var res = goal(s);

    assert.strictEqual(res.length, 0);

    console.log("3.4 Passed :)");
})();

// 3.5 the conjunction goal succeeds if both goals succeed
(function conj_succeeds_if_both_goals_succeed(){
    var s = ukan.emptyS();
    var x = ukan.fresh();
    var y = ukan.fresh();
    var goal = ukan.conj(ukan.unify(x,"hello"), ukan.unify(y, "goodbye"));
    var res = goal(s);

    assert.strictEqual(res.length, 1);
    assert.strictEqual(ukan.lookup(res[0], x), "hello");
    assert.strictEqual(ukan.lookup(res[0], y), "goodbye");

    console.log("3.5 Passed :)");
})();

// 3.6 the conjunction goal is a composition, so if both goals return
// two results, then we will get 4 results from the conjunction
(function conj_can_return_more_than_one_substituton(){
    var s = ukan.emptyS();
    var x = ukan.fresh();
    var y = ukan.fresh();
    var z = ukan.fresh();
    var q = ukan.fresh();

    var disjGoal1 = ukan.disj(ukan.unify(x,1), ukan.unify(y,2));
    var disjGoal2 = ukan.disj(ukan.unify(z,3), ukan.unify(q,4));
    var goal = ukan.conj(disjGoal1, disjGoal2);
    var res = goal(s);

    assert.strictEqual(res.length, 4);

    assert.strictEqual(ukan.lookup(res[0], x), 1);
    assert.strictEqual(ukan.lookup(res[0], z), 3);
    assert.strictEqual(ukan.lookup(res[1], x), 1);
    assert.strictEqual(ukan.lookup(res[1], q), 4);

    assert.strictEqual(ukan.lookup(res[2], y), 2);
    assert.strictEqual(ukan.lookup(res[2], z), 3);
    assert.strictEqual(ukan.lookup(res[3], y), 2);
    assert.strictEqual(ukan.lookup(res[3], q), 4);

    console.log("3.6 Passed :)");
})();

console.log( "\n3) Complete!");

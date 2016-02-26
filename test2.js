var assert = require('assert');
var ukan = require('./ukan.js');

/*
 * 2) Simple Goals and Unification
 * 
 * Our logic system will evaluate 'goals'.
 * A goal maps a substitution (our current knowledge) to 0 or more
 * substitutions (gained knowledge).
 *
 * A goal that return no substitutions is said to 'fail'
 * A goal that returns at least one substitution 'succeeds'
 *
 * We start by defining basic goals to represent failure and success.
 * We then build our first real goal, and the heart of the logic system
 * 'unify'.
 *
 * We actually implement any complex goal as a function that returns a goal,
 * in order to allow us to combine goals more easliy later on.
 *
 */

console.log("\n2) Simple Goals and Unification\n");

// 2.1) the success goal takes a substitution and returns a list
// containing that substitution 
(function success_returns_a_list_of_the_input_substitution(){
    var s = ukan.emptyS();
    var res = ukan.success(s);

    assert.strictEqual(res[0], s);

    console.log("2.1 Passed :)");
})();

// 2.2) the fail goal takes a substitution and returns an
// empty list
(function fail_returns_an_empty_list(){
    var res = ukan.fail(ukan.emptyS());

    assert.strictEqual(res.length, 0);

    console.log("2.2 Passed :)");
})();

// 2.3) unify returns a goal which succeeds in unifying two idential
// values but this does not increase our knowledge.
(function unify_goal_succeeds_for_identical_values_but_no_new_knowledge(){
    var s = ukan.emptyS();
    // remember, a goal is a function that maps a substitution to 0
    // or more substitutions
    var unifyGoal = ukan.unify(1,1);
    var res = unifyGoal(s);

    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0], s);

    console.log("2.3 Passed :)");
})();

// 2.4) unify returns a goal which fails in unifying two different values.
(function unify_goal_fails_for_different_values(){
    var unifyGoal = ukan.unify("oranges","apples");
    var res = unifyGoal(ukan.emptyS());

    assert.strictEqual(res.length, 0);

    console.log("2.4 Passed :)");
})();

// 2.5) unify returns a goal which succeeds in unifying fresh variable with
// a value, and returns a substitution with this knowledge.
(function unify_goal_succeeds_for_fresh_var_and_value(){
    var x = ukan.fresh();
    var unifyGoal = ukan.unify("apples",x);
    var res = unifyGoal(ukan.emptyS());

    assert.strictEqual(res.length, 1);
    assert.strictEqual(ukan.lookup(res[0], x), "apples");

    console.log("2.5 Passed :)");
})();

// 2.6) we can unify empty lists
(function unify_goal_succeeds_for_empty_lists(){
    var s = ukan.emptyS();
    var list1 = [];
    var list2 = [];
    var unifyGoal = ukan.unify(list1, list2);
    var res = unifyGoal(s);

    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0], s);

    console.log("2.5 Passed :)");
})();

// 2.6) we can unify empty lists where each element unifies
(function unify_goal_succeeds_for_lists_where_each_element_unifies(){
    var x = ukan.fresh();
    var y = ukan.fresh();
    var list1 = [true,x];
    var list2 = [y,"apples"];
    var unifyGoal = ukan.unify(list1, list2);
    var res = unifyGoal(ukan.emptyS());

    assert.strictEqual(res.length, 1);
    assert.strictEqual(ukan.lookup(res[0], x), "apples");
    assert.strictEqual(ukan.lookup(res[0], y), true);

    console.log("2.5 Passed :)");
})();

console.log( "\n2) Complete!");

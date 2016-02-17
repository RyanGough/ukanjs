var assert = require('assert');
var ukan = require('./ukan.js');

console.log("ukan testing...");

/* before we begin, here is a useful function for our tests.
 * You may notice that is only works for simple lists and
 * not lists of lists or lists of objects, but for now
 * this will suffice */

function listsEqual(l1, l2){
    if (l1.length !== l2.length){
        return false;
    }
    if (l1.length === 0 && l2.length === 0){
        return true;
    }
    var [h1,...t1] = l1;
    var [h2,...t2] = l2;
    return h1 === h2 && listsEqual(t1, t2);
}

/* ok, lets start with logic variables and substitutions */

// first lets define the empty substitution
var emptyS = {};

(function looking_up_a_value_in_empty_substitution_returns_the_value(){
    var result = ukan.lookup(1, emptyS);
    assert.strictEqual(result, 1);
})();

(function looking_up_a_fresh_lvar_in_empty_substitution_returns_the_lvar(){
    var lvar = ukan.fresh();
    var result = ukan.lookup(lvar, emptyS);
    assert.strictEqual(result, lvar);
})();

(function looking_up_lvar_with_binding_in_substitution_returns_the_bound_value(){
    var substitution = {};
    var lvar = ukan.fresh();
    substitution[lvar] = "abc";
    var result = ukan.lookup(lvar, substitution);
    assert.strictEqual(result, "abc");
})();

(function looking_up_an_lvar_follows_the_chain(){
    var substitution = {};
    var lvar1 = ukan.fresh();
    var lvar2 = ukan.fresh();
    substitution[lvar2] = "abc";
    substitution[lvar1] = lvar2;
    var result = ukan.lookup(lvar1, substitution);
    assert.strictEqual(result, "abc");
})();

/* now for the big one, unification */

(function can_unify_two_equal_values_in_any_substitution(){
    var result = ukan.unify(1, 1, emptyS);
    assert.strictEqual(result, emptyS);
})();

(function can_not_unify_two_unequal_values_in_any_substitution(){
    var result = ukan.unify(1, 2, emptyS);
    assert.strictEqual(result, null);
})();

(function unify_fresh_var_with_value_extends_substitution(){
    var lvar = ukan.fresh();
    var result = ukan.unify(lvar,"fresh",emptyS);
    assert.strictEqual(result[lvar], "fresh");
})();

(function unify_value_with_fresh_var_extends_substitution(){
    var lvar = ukan.fresh();
    var result = ukan.unify("fresh", lvar, emptyS);
    assert.strictEqual(result[lvar], "fresh");
})();

(function unify_works_with_lists(){
    // a clue - think about how listsEqual works...
    var result = ukan.unify([1,2,"abc"], [1,2,"abc"], emptyS);
    assert.equal(result, emptyS);
})();

(function unify_fails_if_lists_cannot_be_unified(){
    // a clue - think about how listsEqual works...
    var result = ukan.unify([1,2,"abd"], [1,2,"abc"], emptyS);
    assert.equal(result, null);
})();

/* a goal is a function that maps a substitution to 
 * a sequence of 0 or more substitutions.
 *
 * a goal that results in 0 substitutions has failed.
 * a goal that results in 1 or more substitutions succeeded.
 */

(function the_simplest_goal_that_fails_is_fail(){
    var result = ukan.fail(emptyS);
    assert(listsEqual(result, []));
})();

(function the_simplest_goal_that_succeeds_is_success(){
    var result = ukan.success(emptyS);
    assert(listsEqual(result, [emptyS]));
})();

/* we need a way to combine goals.
 * disj is a function which returns a goal from two input goals.
 * It can be seen as the logical OR of those two goals */
(function disj_returns_a_goal_that_combines_results_from_two_other_goals(){
    var goal1 = ukan.success;
    var goal2 = ukan.success;
    // note - disj is not a goal, it returns a goal
    var disj_goal = ukan.disj(goal1, goal2);
    var result = disj_goal(emptyS);
    assert(listsEqual(result, [emptyS, emptyS]));
})();

/* lets create more functions that return goals, as these
 * allow us to do useful compositions */

/* first a simple wrapper around unify */
(function eq_is_successful_if_args_can_be_unified(){
    var lvar = ukan.fresh();
    var result = ukan.eq("wibble", lvar)({});
    assert.strictEqual(result[0][lvar], "wibble");
})();

/* now a really useful goal, membership of a list, using disjunction, eq
 * and recursion... */
(function choice_succeeds_if_var_is_in_list(){
    var lvar = ukan.fresh();
    var result = ukan.choice(lvar, [1, "wibble", {test: "hello"}])({});
    assert.strictEqual(result[0][lvar], 1);
    assert.strictEqual(result[1][lvar], "wibble");
    assert.deepEqual(result[2][lvar], {test: "hello"});
})();

console.log("done!");

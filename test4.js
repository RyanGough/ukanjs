var assert = require('assert');
var ukan = require('./ukan.js');

/*
 * 4) Finally, A Logic Program! 
 * 
 * We can finally create a "useful" logic program, but first we need
 * one more goal.
 *
 * We define 'member' which returns a goal that  succeeds if the first
 * argument can be unified with any item in a given list.
 *
 * We then use this to build a program in our logic language which
 * can find the common elements in two list 
 *
 */

console.log("\n4) Finally, A Logic Program!\n");

// 4.1) member returns a goal that fails if the first argument cannot
// be unified with any item in the second argument
(function member_fails_if_no_unification_possible(){
    var s = ukan.emptyS();
    var goal = ukan.member(1, [2]);
    var res = goal(s);

    assert.strictEqual(res.length, 0);

    console.log("4.1 Passed :)");
})();

// 4.2) member returns a goal that succeeds if unification of the first
//  argument is possible with an item in the second
(function member_succeeds_if_unification_possible(){
    var s = ukan.emptyS();
    var x = ukan.fresh();
    var goal = ukan.member(x, [2]);
    var res = goal(s);

    assert.strictEqual(res.length, 1);

    console.log("4.2 Passed :)");
})();

// 4.3) member can return multiple possible results 
(function member_succeeds_if_unification_possible(){
    var s = ukan.emptyS();
    var x = ukan.fresh();
    var goal = ukan.member(x, [2, 3, 4]);
    var res = goal(s);

    assert.strictEqual(res.length, 3);
    assert.strictEqual(ukan.lookup(res[0], x), 2);
    assert.strictEqual(ukan.lookup(res[1], x), 3);
    assert.strictEqual(ukan.lookup(res[2], x), 4);

    console.log("4.3 Passed :)");
})();

// 4.4) common takes two list and returns the common members
(function member_succeeds_if_unification_possible(){
    var res = ukan.common([1,2,3,4],[3,7,1,9]);

    assert.strictEqual(res.length, 2);
    assert.strictEqual(res[0],1);
    assert.strictEqual(res[1],3);

    console.log("4.4 Passed :)");
})();

console.log( "\n4) Complete!");

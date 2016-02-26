# ukan.js
Playing around with micro-kanren in JavaScript.
Inspired by [The Reasoned Schemer](https://mitpress.mit.edu/books/reasoned-schemer).
An approximation of Oleg Kiselyov's [sokuza-kanren](https://github.com/miniKanren/sokuza-kanren) in JavaScript. When I got stuck I consulted Bodil Stokke's [lolkanren](https://gitlab.com/bodil/lolkanren), though of course the mistakes are all my own.

## approach:
I wanted to create a series to tests to slowly build up a sokuza-kanren style logic DSL in JavaScript. The tests are split into 3 parts, the first introducing logic variables and substitutions. The second simple goals and unification, and the third combining goals to build more complex logic programming abilities.

I also decided to try out a few ES6 features and not have any other dependancies, hence the fairly basic nature of the tests.


## run the tests:
node --harmony_destructuring test1.js
node --harmony_destructuring test2.js
node --harmony_destructuring test3.js

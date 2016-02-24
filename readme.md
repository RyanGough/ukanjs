# ukan.js
Playing around with micro-kanren in JavaScript.
Inspired by [The Reasoned Schemer](https://mitpress.mit.edu/books/reasoned-schemer).
An approximation of Oleg Kiselyov's [sokuza-kanren](https://github.com/miniKanren/sokuza-kanren) in JavaScript. When I got stuck I consulted Bodil Stokke's [lolkanren](https://gitlab.com/bodil/lolkanren), though of course the mistakes are all my own.

## approach:
I decided to try out a few ES6 features and not have any other dependancies, hence the fairly basic nature of the tests.

## run the tests:
node --harmony_destructuring test.js

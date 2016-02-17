ukan.js
-------
Playing around with micro-kanren in JavaScript.
Inspired by [The Reasoned Schemer](https://mitpress.mit.edu/books/reasoned-schemer)
Implementation helped along by from Oleg Kiselyov's [sokuza-kanren](https://github.com/miniKanren/sokuza-kanren) and Bodil Stokke's [lolkanren](https://gitlab.com/bodil/lolkanren), though of course the mistakes are all my own.

approach:
====
I wanted to keep it as simple as possible, with no dependancies. Also wanted to try out some ES6 features to bring my JS skills out of the stone age.

run the tests:
====
It uses some ES6 features so you will need to do:
node --harmony_destructuring test.js

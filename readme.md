# ukan.js
Playing around with miniKanren in JavaScript, inspired by [The Reasoned Schemer](https://mitpress.mit.edu/books/reasoned-schemer).
The idea of this repo is to have a series of tests to lead towards an approximation of Oleg Kiselyov's [sokuza-kanren](https://github.com/miniKanren/sokuza-kanren) in JavaScript. When I got stuck I consulted Bodil Stokke's [lolkanren](https://gitlab.com/bodil/lolkanren), though of course the mistakes are all my own.
The name is a contraction and distortion of μKanren, and I feel it has a pleasing positivity about it :)

## approach:
A placeholder module is given with some of the most basic functions already implemented but the others waiting to be completed. My full solution is given in a separate folder to be consulted if you get stuck.  
The tests are split parts, the first introducing logic variables and substitutions. The second simple goals and unification, and the third combining goals with conjunction and disjunction and the fouth and currently final introducing a first simple logic program. Oh, and please forgive the basic nature of the tests, but I didn't want to add any dependencies on test libraries / frameworks etc.

## run the tests:
node --harmony_destructuring test1.js  
node --harmony_destructuring test2.js  
node --harmony_destructuring test3.js  
node --harmony_destructuring test4.js  

function ukan_fresh(){
    return Symbol();
}

function ukan_emptyS(){
    return {};
}

function ukan_lookup(s, v){
    var res = s[v];
    if (res === undefined){
        return v;
    }
    if (typeof res === 'symbol'){
        return ukan_lookup(s, res);
    }
    return res;
}

function ukan_extend(s,v,val){
    var newS = Object.create(s);
    newS[v] = val;
    return newS;
}

function ukan_success(x){
    return [x];
}

function ukan_fail(){
    return [];
}

function ukan_unifyS(s,x,y){
    if (x instanceof Array 
        && y instanceof Array
        && x.length === y.length) {
        if (x.length === 0){
            return s;
        }
        var [xHead,...xTail] = x;
        var [yHead,...yTail] = y;
        var newS = ukan_unifyS(s,xHead,yHead);
        if (newS === null){
            return null;
        }
        return ukan_unifyS(newS,xTail,yTail);
    }
    x = ukan_lookup(s,x);
    y = ukan_lookup(s,y);
    if (typeof x === 'symbol'){
        return ukan_extend(s, x, y);
    }
    if (typeof y === 'symbol'){
        return ukan_extend(s, y, x);
    }
    if (x === y){
        return s;
    }
    return null;
}

function ukan_unify(x,y){
    return function(s) {
        var newS = ukan_unifyS(s,x,y);
        if (newS === null){
            return ukan_fail();
        } else {
            return ukan_success(newS);
        }
    }
}

function ukan_disj(f1, f2){
    return function(s){
        return f1(s).concat(f2(s));
    }
};

function ukan_conj(f1, f2){
    return function(s){
        return f1(s).reduce((acc,x) => acc.concat(f2(x)), []);
    }
};

module.exports = {
    // 1
    fresh: ukan_fresh,
    emptyS: ukan_emptyS,
    lookup: ukan_lookup,
    extend: ukan_extend,
    // 2
    success: ukan_success,
    fail: ukan_fail,
    unifyS: ukan_unifyS,
    unify: ukan_unify,
    // 3
    disj: ukan_disj,
    conj: ukan_conj
}

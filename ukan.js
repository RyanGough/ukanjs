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

function unify(s,x,y){
    if (x instanceof Array 
        && y instanceof Array
        && x.length === y.length) {
        if (x.length === 0){
            return s;
        }
        var [xHead,...xTail] = x;
        var [yHead,...yTail] = y;
        var newS = unify(s,xHead,yHead);
        if (newS === null){
            return null;
        }
        return unify(newS,xTail,yTail);
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
        var newS = unify(s,x,y);
        if (newS === null){
            return ukan_fail();
        } else {
            return ukan_success(newS);
        }
    }
}

function ukan_success(x){
    return [x];
}

function ukan_fail(){
    return [];
}

function ukan_disj(f1, f2){
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
    unify: ukan_unify
}

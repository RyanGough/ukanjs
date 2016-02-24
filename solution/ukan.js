function ukan_lookup(v, s){
    var res = s[v];
    if (res === undefined){
        return v;
    }
    if (typeof res === 'symbol'){
        return ukan_lookup(res, s);
    }
    return res;
}

function ukan_fresh(){
    return Symbol();
}

function ukan_lvar(x){
    return typeof x === 'symbol';
}

function ukan_extend(s,x,y){
    var extS = Object.create(s);
    extS[x] = y;
    return extS;
}

function ukan_unify(x,y,s){
    var x1 = ukan_lookup(x,s);
    var y1 = ukan_lookup(y,s);
    if (ukan_lvar(x1)){
        return ukan_extend(s,x1,y1); 
    }
    if (ukan_lvar(y1)){
        return ukan_extend(s,y1,x1); 
    }
    if (x1 === y1){
        return s;
    }
    if (isArray(x1) && isArray(y1)){
        if (x1.length === 0 && y1.length === 0){
            return s;
        }
        var [xh,...xt] = x1;
        var [yh,...yt] = y1;
        var extS = ukan_unify(xh, yh, s);
        if (extS !== null){
            return ukan_unify(xt, yt, extS);
        }
    }
    return null;
}

function ukan_success(x){
    return [x];
}

function ukan_fail(){
    return [];
}

function ukan_disj(f1, f2){
    return x => f1(x).concat(f2(x));
};

function ukan_eq(x,y){
    return function(s){
        var extS = ukan_unify(x,y,s);
        if (extS !== null){
            return ukan_success(extS);
        } else {
            return ukan_fail();
        }
    }
}

function ukan_choice(v, list){
    if (list.length === 0){
        return ukan_fail;
    }
    var [h,...t] = list;
    return ukan_disj(
        ukan_eq(v,h),
        ukan_choice(v,t));
}

function isArray(x){
    return Object.prototype.toString.call(x) === '[object Array]';
}

module.exports = {
    lookup: ukan_lookup,
    fresh: ukan_fresh,
    unify: ukan_unify,
    success: ukan_success,
    fail: ukan_fail,
    disj: ukan_disj,
    eq: ukan_eq,
    choice: ukan_choice,
}

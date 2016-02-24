function ukan_fresh(){
    return Symbol();
}

function ukan_emptyS(){
    return {};
}

function ukan_lookup(s, v){
    var res = s[v];
    if (res  === undefined){
        return v;
    }
    if (typeof res === 'symbol'){
        return ukan_lookup(s,res);
    }
    return res;
}

function ukan_extend(s,v,val){
    var newS = Object.create(s);
    newS[v] = val;
    return newS;
}

function ukan_unify(x,y,s){
    // to be implementeu
}

function ukan_success(x){
    return [x];
}

function ukan_fail(){
    return [];
}

function ukan_disj(f1, f2){
};

function ukan_eq(x,y){
}

function ukan_choice(v, list){
}

module.exports = {
    fresh: ukan_fresh,
    emptyS: ukan_emptyS,
    lookup: ukan_lookup,
    extend: ukan_extend
}

function ukan_fresh(){
    return Symbol();
}

function isFresh(v){
    return typeof v === 'symbol';
}

function ukan_emptyS(){
    return {};
}

function ukan_success(x){
    return [x];
}

function ukan_fail(){
    return [];
}

function ukan_lookup(s, v){
    // to be implemented...
}

function ukan_extend(s,v,val){
    // to be implemented...
}

function ukan_unifyS(s,x,y){
    // to be implemented...
}

function ukan_unify(x,y){
    // to be implemented...
}

function ukan_disj(f1, f2){
    // to be implemented...
};

function ukan_conj(f1, f2){
    // to be implemented...
};

function ukan_member(v, l){
    // to be implemented...
}

function ukan_common(l1, l2){
    // to be implemented...
}

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
    conj: ukan_conj,
    // 4
    member: ukan_member,
    common: ukan_common,
}

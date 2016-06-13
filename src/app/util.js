'use strict';

export const extendOptions = function(a, b){
    for ( let i in b ){
        a[i] = b[i];
    }
    return a;
}

export const typedof = function(obj, type){
    const _type = Object.prototype.toString.call(obj).split(' ')[1].replace(/\]$/, '');
    if ( type ){
        return _type == type;
    }else{
        return _type;
    }
}

export const isElement = function isElement(el){
    const type = typedof(el);
    return /^HTML/i.test(type) && /Element$/i.test(type);
}

export const compile = function(_component){
    if ( !_component.prototype ) return _component;

    return (new _component()).$_install()._vue_options;
}

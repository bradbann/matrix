import 'setimmediate';
import Bootstrap from './app/boot';
import Ready from 'domready';
import FastClick from 'fastclick';
import Vue from 'vue';
import Server from './app/connect';
import Webview from './app/webview';
import MXCOMPONENTS from './app/components';
import MXCOMPONENT from './app/component';

export { Promise } from 'es6-promise';
export { EventEmitter } from 'events';
export const server = Server;
export const webview = Webview;
export const vue = Vue;
export const components = MXCOMPONENTS;
export const component = MXCOMPONENT;

export const bootstrap = function(){
    const app = new Bootstrap();
    Vue.prototype.$app = app;
    return app;
};

export const ready = function(cb){
    Ready(function(){
        FastClick.attach(document.body);
        cb();
    });
};

let keys = Object.keys(MXCOMPONENTS);
let i = keys.length;
let COMPONENTS = {};

while ( i-- ){
    let cp = MXCOMPONENTS[keys[i]];
    if ( !!cp.prototype ){
        cp = new cp();
        cp.$_install();
        COMPONENTS[keys[i]] = cp._vue_options;
    }
    else {
        COMPONENTS[keys[i]] = cp;
    }
}

export const $define = function(name, cb){
    let _component;

    if ( typeof cb === 'function' && !cb.prototype ){
        _component = cb(component, components);
    }else{
        _component = cb;
    }

    components[name] = _component;

    if ( !!_component.prototype ){
        let cp = new _component();
        cp.$_install();
        widgets[name] = cp._vue_options;
    }else{
        widgets[name] = _component;
    }
}

export const widgets = COMPONENTS;

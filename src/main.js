import 'setimmediate';
import Bootstrap from './app/boot';
import Ready from 'domready';
import FastClick from 'fastclick';
import Vue from 'vue';
import Server from './app/connect';
import Webview from './app/webview';
import { Components, COMPONENTLIST } from './app/components';
import ComponentConstructor from './app/component';

export { Promise } from 'es6-promise';
export { EventEmitter } from 'events';
export const server = Server;
export const webview = Webview;
export const vue = Vue;
export const components = Components;
export const component = ComponentConstructor;

export const bootstrap = function(el, options){
    const app = new Bootstrap(el, options);
    Vue.prototype.$app = app;
    return app;
};

export const ready = function(cb){
    Ready(function(){
        FastClick.attach(document.body);
        cb();
    });
};

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
        COMPONENTLIST[name] = cp._vue_options;
    }else{
        COMPONENTLIST[name] = _component;
    }
}

export const widgets = COMPONENTLIST;

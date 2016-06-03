import 'setimmediate';
import Bootstrap from './app/boot';
import Ready from 'domready';
import FastClick from 'fastclick';
import Vue from 'vue';
import Server from './app/connect';
import Webview from './app/webview';

export { Promise } from 'es6-promise';
export { EventEmitter } from 'events';
export const server = Server;
export const webview = Webview;
export const vue = Vue;

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

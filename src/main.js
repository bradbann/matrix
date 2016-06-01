import 'setimmediate';
import Bootstrap from './app/boot';
import Ready from 'domready';
import FastClick from 'fastclick';
import Vue from 'vue';
import Server from './app/connect';

export const server = Server;

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

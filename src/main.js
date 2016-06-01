import 'setimmediate';
import Bootstrap from './app/bootstrap';
import Ready from 'domready';
import FastClick from 'fastclick';
import Vue from 'vue';

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

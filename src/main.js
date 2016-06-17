require('normalize.css');
require('./css/matrix.scss');

import 'setimmediate';
import Vue                              from 'vue';
import Ready                            from 'domready';
import Connect                          from './app/connect';
import Webview                          from './app/webview';
import Bootstrap                        from './app/boot';
import FastClick                        from 'fastclick';
import * as Util                        from './app/util';
import ComponentConstructor             from './app/component';
//import { Components, COMPONENTLIST }    from './app/components';

export { Promise }                      from 'es6-promise';
export { EventEmitter }                 from 'events';

export const vue        = Vue;
export const connect    = Connect;
export const compile    = Util.compile;
export const webview    = Webview;
export const component  = ComponentConstructor;
export const components = Util.MioxComponents;
export const util       = Util;

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

export const define = function(name, cb){
    if ( typeof name === 'string' && cb ){
        let _component;

        if (typeof cb === 'function' && !cb.prototype && !cb.prototype.$_install){
            _component = cb(component, components);
        }else{
            _component = cb;
        }

        Util.MioxComponents[name] = _component;
        Util.VueComponents[name] = compile(_component);
    }else{
        for ( let i in name ){
            Util.MioxComponents[i] = name[i];
            Util.VueComponents[i] = compile(name[i]);
        }
    }
}

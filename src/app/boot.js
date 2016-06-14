'use strict';

import Http from './http';
import Connect from './connect';
import vue from 'vue';
import { flowExtend, typedof, isElement } from './util';

const Body = document.body;
const OPTIONS = {
    backgroundColor: '#222',
    debug: false,
    delimiters: ["{{", "}}"],
    unsafeDelimiters: ["{{{", "}}}"],
    async: true,
    animate:'slide'    // fade|drown|cube
};

export default class BootStrap extends Connect {
    constructor(el, options){
        super();

        let _el, _options;

        if ( !options ){
            if ( !el ){
                _el = Body;
                _options = {};
            }else{
                if ( isElement(el) ){
                    _el = el;
                    _options = {};
                }else{
                    _options = el;
                    _el = Body;
                }
            }
        }else{
            _el = el || Body;
            _options = options;
        }

        this.$server = new Http();
        this.$webviews = {};
        this.$server.$app = this;
        this.$el = _el;
        this.$options = flowExtend(OPTIONS, _options);

        if ( this.$options.debug ){
            vue.config.debug = true;
            vue.config.silent = false;
            vue.config.devtools = true;
        }else{
            vue.config.debug = false;
            vue.config.silent = true;
            vue.config.devtools = false;
        }

        vue.config.async = this.$options.async;
        vue.config.delimiters = this.$options.delimiters;
        vue.config.unsafeDelimiters = this.$options.unsafeDelimiters;
    }

    listen(){
        const _app = document.createElement('div');
        _app.classList.add('mx-app');
        this.$el.appendChild(_app);
        this.$node = _app;
        this.$server.on('http:change', reset => {
            this.route = this.$server.pathname;
            this.emit('route:start');
            this.handle(() => reset(() => this.emit('route:end')));
        });
        this.on('route:end', () => this.$node.style.backgroundColor = this.$options.backgroundColor);
        this.emit('ready');
    }
}

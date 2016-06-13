'use strict';

import Http from './http';
import Connect from './connect';
import vue from 'vue';

const Body = document.body;

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
        this.$options = extendOptions({
            backgroundColor: '#222',
            debug: false,
            delimiters: ["{{", "}}"],
            unsafeDelimiters: ["{{{", "}}}"],
            async: true
        }, _options);

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

function extendOptions(a, b){
    for ( let i in b ){
        a[i] = b[i];
    }
    return a;
}

function typedof(obj, type){
    const _type = Object.prototype.toString.call(obj).split(' ')[1].replace(/\]$/, '');
    if ( type ){
        return _type == type;
    }else{
        return _type;
    }
}

function isElement(el){
    const type = typedof(el);
    return /^HTML/i.test(type) && /Element$/i.test(type);
}

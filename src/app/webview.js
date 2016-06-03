'use strict';

import { EventEmitter } from 'events';
import Vue from 'vue';


export default class Webview extends EventEmitter {
    constructor(node){
        super();
        this.$node = node;
    }

    $destroy(){
        this.$vm.$destroy(true);
    }

    _bind(next){
        next(this);
    }

    _publish(next){
        const that = this;
        let options = this.render ? this.render() : {};
        const _ready = options.ready;

        options.el = this.$node;
        options.replace = false;

        options.ready = function(){
            _ready && _ready.call(this);
            this.$server = this.$app.$server;
            that._bind(next);
        }

        options = this._extend(options);
        this.$vm = new Vue(options);
        this.$vm.$webview = this;
    }

    _extend(options){
        const that = this;
        if ( !options.methods ){
            options.methods = {};
        }
        options.methods.$redirect = function(url){ this.$server.redirect(url); }
        options.methods.$reback = function(url){ this.$server.reback(url); }
        options.methods.$forward = function(url){ this.$server.forward(url); }
        options.methods.$back = function(url){ this.$server.back(url); }
        options.methods.$refresh = function(){ this.$server.refresh(); }
        return options;
    }
}

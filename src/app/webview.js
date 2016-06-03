'use strict';

import { EventEmitter } from 'events';
import { redirect, reback, forward, back, refresh } from './directive';
import Vue from 'vue';


export default class Webview extends EventEmitter {
    constructor(node){
        super();
        this.$node = node;
    }

    $destroy(){
        this.$vm.$destroy(true);
    }

    _publish(next){
        const that = this;
        let options = this.render ? this.render() : {};
        const _ready = options.ready;
        const _destroyed = options.destroyed;

        options.el = this.$node;
        options.replace = false;

        options.ready = function(){
            _ready && _ready.call(this);
            this.$server = this.$app.$server;
            if ( that.ready ){
                that.ready();
            }
            next(that);
        }

        options.destroyed = function(){
            _destroyed && _destroyed.call(this);
            if ( that.destroyed ){
                that.destroyed();
            }
        }

        options = this._extend(options);
        console.log(options)
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
        if ( !options.mixins ){
            options.mixins = [];
        }
        if ( !Array.isArray(options.mixins) ){
            options.mixins = [options.mixins];
        }
        options.mixins.push({
            directives: { redirect, reback, forward, back, refresh }
        });
        return options;
    }
}

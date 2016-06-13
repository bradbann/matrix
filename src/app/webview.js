'use strict';
import { compile } from './util';
import { COMPONENTLIST } from './components';
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
        options = this._components(options);
        this.$vm = new Vue(options);
        this.$vm.$webview = this;
    }

    _components(options){
        let components = options.components;
        let mixins = options.mixins;
        let i;

        if ( components ){
            for ( i in components ){
                options.components[i] = compile(components[i]);
            }
        }

        if ( mixins ){
            if ( Array.isArray(mixins) ){
                options.mixins = mixins.map(function(mixin){
                    if ( mixin.components ){
                        for ( let j in mixin.components ){
                            mixin.components[j] = compile(mixin.components[j]);
                        }
                    }
                    return mixin;
                });
            }else{
                if ( mixins.components ){
                    for ( let z in mixins.components ){
                        options.mixins.components[z] = compile(mixins.components[z]);
                    }
                }
            }
        }

        return options;
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
            directives: { redirect, reback, forward, back, refresh },
            components: COMPONENTLIST
        });
        return options;
    }
}

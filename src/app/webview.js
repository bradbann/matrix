'use strict';
import { compile, VueComponents } from './util';
import { EventEmitter } from 'events';
import { redirect, reback, forward, back, refresh, touch, click } from './directive';
import Vue from 'vue';

Vue.directive('click', click);
Vue.directive('touch', touch);

export default class Webview extends EventEmitter {
    constructor(node){
        super();
        this.$node = node;
    }

    $destroy(){
        this.$vm.$destroy(true);
    }

    $redirect(url){
        this.$server.redirect(url);
    }
    $reback(url){
        this.$server.reback(url);
    }
    $forward(url){
        this.$server.forward(url);
    }
    $back(url){
        this.$server.back(url);
    }
    $refresh(url){
        this.$server.refresh(url);
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
        options.methods.$redirect = (url) => { this.$redirect(url); }
        options.methods.$reback = (url) => { this.$reback(url); }
        options.methods.$forward = (url) => { this.$forward(url); }
        options.methods.$back = (url) => { this.$back(url); }
        options.methods.$refresh = () => { this.$refresh(); }
        if ( !options.mixins ){
            options.mixins = [];
        }
        if ( !Array.isArray(options.mixins) ){
            options.mixins = [options.mixins];
        }

        options.mixins.push({
            directives: { redirect, reback, forward, back, refresh },
            components: VueComponents
        });
        return options;
    }
}

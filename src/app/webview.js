'use strict';
import { compile, VueComponents } from './util';
import { EventEmitter } from 'events';
import Vue from 'vue';
import Component from './component';
const noop = function(){}

export default class Webview extends Component {
    constructor(node){
        super();
        this.$node = node;
        this.name = 'Webview';
        this._vue_options.mixins.push({ components: VueComponents });
    }

    $destroy(){ this.$vm.$destroy(true); }
    $redirect(url){ this.$server.redirect(url); }
    $reback(url){ this.$server.reback(url); }
    $forward(url){ this.$server.forward(url); }
    $back(url){ this.$server.back(url); }
    $refresh(){ this.$server.refresh(); }

    _publish(next){
        const that = this;
        let template = this.render ? this.render() : '';
        this.$_install();

        const options = this._vue_options;
        if ( template ){
            options.template = template;
        }
        
        if ( typeof options.data === 'function' ){
            options.data = options.data();
        }

        const ready = options.ready || noop;
        options.ready = function(){
            this.$server = this.$app.$server;
            ready.call(this);
            next(that);
        }

        options.el = this.$node;
        options.replace = false;

        this.$vm = new Vue(options);
        this.$vm.$webview = this;
    }
}

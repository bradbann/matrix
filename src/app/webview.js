'use strict';

import { EventEmitter } from 'events';
import Vue from 'vue';

export default class Webview extends EventEmitter {
    constructor(node){
        super();
        this.$node = node;
    }

    destroy(){

    }

    _bind(direction, next){
        switch (direction){
            case 'FORWARD':
                console.log('forward')
                break;
            case 'BACKWARD':
                console.log('backward')
                break;
            case 'BACK':
                console.log('back');
                break;
            case 'REFRESH':
                console.log('refresh');
                break;
            default:
                console.log('none')
        }
        next();
    }

    _publish(direction, next){
        const that = this;
        const options = this.render ? this.render() : {};
        const _ready = options.ready;

        options.el = this.$node;
        options.replace = false;

        options.ready = function(){
            that._bind(direction, next);
            _ready && _ready.call(this);
        }

        this.$vm = new Vue(options);
        this.$vm.$webview = this;
    }
}

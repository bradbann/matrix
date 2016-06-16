'use strict';

import Vue from 'vue';

export const redirect = httpURL('$redirect');
export const reback = httpURL('$reback');
export const forward = httpURL('$forward');
export const back = httpURL('$back');
export const refresh = httpURL('$refresh');

function httpURL(method){
    return {
        priority: 3000,
        twoWay: true,
        acceptStatement: true,
        params: ['url'],
        bind(){
             this._cb = () => {
                if ( !this.params.url ) return;
                this.vm.$root[method](this.params.url);
             };
             Vue.util.on(this.el, 'click', this._cb);
        },
        unbind(){
            Vue.util.off(this.el, 'click', this._cb);
            delete this._cb;
        }
    }
}


/**
 * v-touch.literal = '[event name]';
 * 将touch动作产生的scrollTop反应到对应的event-name事件上
 * 唯一参数 top {number}
 */
export const touch = {
    priority: 3000,
    bind(){
        Vue.util.on(this.el, 'scroll', this._cb = (e) => {
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return
            }
            this.vm.$emit(this.mark, this.el.scrollTop);
        });
    },
    update(val, old){
        this.mark = val;
        old && this.vm.$off(old);
    },
    unbind(){
        Vue.util.off(this.el, 'scroll', this._cb);
        delete this._cb;
    }
}

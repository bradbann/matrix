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
             Vue.util.on(this.el, 'click', this._httpurlcb = () => {
                if ( !this.params.url ) return;
                this.vm.$root[method](this.params.url);
             });
        },
        unbind(){
            Vue.util.off(this.el, 'click', this._httpurlcb);
            delete this._httpurlcb;
        }
    }
}


/**
 * v-touch:[event name];
 * 将touch动作产生的scrollTop反应到对应的event-name事件上
 * 唯一参数 top {number}
 */
export const touch = {
    priority: 3000,
    bind(){
        const mark = this.arg;
        if ( mark ){
            Vue.util.on(this.el, 'scroll', this._touchcb = (e) => {
                if (e.target.tagName.match(/input|textarea|select/i)) {
                    return
                }
                this.vm.$emit(mark, this.el.scrollTop);
            });
        }
    },
    unbind(){
        if ( !this._touchcb ) return;
        Vue.util.off(this.el, 'scroll', this._touchcb);
        delete this._touchcb;
    }
}

export const click = {
    priority: 3000,
    bind(){
        const ref = this.arg;
        if ( ref ){
            Vue.util.on(this.el, 'click', this._clickcb = (e) => {
                if (e.target.tagName.match(/input|textarea|select/i)) {
                    return
                }
                const target = this.vm.$refs[ref];
                if ( target ){
                    target.$emit('click');
                }
            });
        }
    },
    unbind(){
        if ( !this._clickcb ) return;
        Vue.util.off(this.el, 'scroll', this._clickcb);
        delete this._clickcb;
    }
}

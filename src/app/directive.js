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

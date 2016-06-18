import { createHashHistory } from 'history';
import { parse, format } from 'url';
import { EventEmitter } from 'events';
import { deepExtend } from './util';

const delay = 1000 / 60;
const noop = function(){};

export default class Http extends EventEmitter {
    constructor(){
        super();
        this._first = true;
        this._webview = null;
        this._prev = 0;
        this._next = 0;
        this._key = null;
        this.query = {};
        this.params = {};
        this.action = null;
        this._location();
        this._init();
        this._animating = false;
    }

    _location(){
        const origin = parse(window.location.href, true);
        const result = parse(origin.hash ? origin.hash.replace(/^\#/, '') : '/', true);
        this.extra = origin.query;
        this.search = result.search;
        this.pathname = result.pathname;
        this.href = result.href;
    }

    _init(){
        this.history = createHashHistory();
        this.history.listen(local => setTimeout(() => this._listen(local), delay));
    }

    _listen(local){
        if ( this._force ) {
            delete this._force;
            return;
        }
        this.pathname = local.pathname;
        this._key = local.key;
        if ( !local.state && this._first ){
            this._removeAll(() => {
                this.history.replace({
                    pathname: local.pathname,
                    search: local.search,
                    state: {
                        index: window.history.length,
                        url: this.href
                    }
                });
            });
        }else{
            if( local.action === 'PUSH' || local.action === 'REPLACE' ){
                const locationKey = '@@History/' + local.key;
                let stateData = JSON.parse(window.sessionStorage.getItem(locationKey));
                stateData.index = history.length;
                window.sessionStorage.setItem(locationKey, JSON.stringify(stateData));
                if ( local.action === 'REPLACE' ){
                    this.action = 'REFRESH';
                }
                this._removeByKey(stateData.index, locationKey, () => {
                    this._process(stateData.index, local.search);
                });
            }else{
                this._process(local.state.index, local.search);
            }
        }
    }

    _removeAll(cb = noop){
        let len = window.sessionStorage.length;
        while( len-- ){
            let key = window.sessionStorage.key(len);
            if( key.indexOf('@@History') === 0 ){
                window.sessionStorage.removeItem(key);
            }
        }
        setImmediate(cb);
    }

    _removeByKey(index, localkey, cb = noop){
        let len = window.sessionStorage.length;
        let removes = [];
        while( len-- ){
            let key = window.sessionStorage.key(len);
            if( key.indexOf('@@History') === 0 ){
                let state = JSON.parse(window.sessionStorage.getItem(key));
                if ( state.index >= index && key != localkey ){
                    removes.push(key.split('/')[1]);
                    window.sessionStorage.removeItem(key);
                }
            }
        }
        setImmediate(() => {
            if ( removes.length ) this.removes = removes;
            cb();
        });
    }

    _process(index, search){
        if ( this._first ){
            this._next = index;
        }
        else{
            if ( this.action !== 'REFRESH' ){
                this._prev = this._next;
                this._next = index;
            }
            if ( !this.action ){
                if ( this._next > this._prev ){ this.action = 'HISTORY:FORWARD'; }
                else if ( this._next < this._prev ){ this.action = 'HISTORY:BACKWARD'; }
                else{ this.action = 'REFRESH'; }
            }
        }

        const searchQuery = parse(search || '', true);
        this.query = deepExtend(searchQuery.query, this.extra);
        this._first && (delete this._first);
        this.emit('http:change', (cb = noop) => {
            if ( this.removes && this.removes.length ){
                this.removes.forEach(item => {
                    if ( this.$app.$webviews[item] ){
                        this.$app.$webviews[item].$destroy();
                        delete this.$app.$webviews[item];
                    }
                });
                delete this.removes;
            }
            this.action = null;
            if ( this._force ) {
                delete this._force;
            }
            setTimeout(() => {
                this._animating = false;
                cb();
            }, delay);
        });
    }

    _jump(url, type){
        let len = window.sessionStorage.length;
        let index = 0;
        while( len-- ){
            let key = window.sessionStorage.key(len);
            if( key.indexOf('@@History') === 0 ){
                let state = JSON.parse(window.sessionStorage.getItem(key));
                if ( state.url === url ){
                    index = state.index;
                    break;
                }
            }
        }
        if ( index > 0 ){
            this.action = type;
            window.history.go(index - this._next);
        }else{
            this.jump(url, type);
        }
    }

    jump(url, type){
        const object = parse(url);
        this.action = type;
        this.history.push({
            pathname: object.pathname,
            search: object.search,
            state: {
                index: window.history.length,
                url: url
            }
        })
    }

    forward(url){
        if ( this._animating ) return;
        this._animating = true;
        if ( !url ) return window.history.forward();
        if ( !isNaN(url) ){
            let i = Number(url);
            if ( i < 0 ){ i = i * -1; }
            this.action = 'HISTORY:FORWARD';
            window.history.go(i);
        }else{
            this._jump(url, 'APPLICATION:FORWARD');
        }
    }

    back(url){
        if ( this._animating ) return;
        this._animating = true;
        if ( !url ) return window.history.back();
        if ( !isNaN(url) ){
            let i = Number(url);
            if ( i > 0 ){ i = i * -1; }
            this.action = 'HISTORY:BACKWARD';
            window.history.go(i);
        }else{
            this._jump(url, 'APPLICATION:BACKWARD');
        }
    }

    redirect(url){
        if ( this._animating ) return;
        this._animating = true;
        this.jump(url, 'APPLICATION:FORWARD');
    }

    reback(url){
        if ( this._animating ) return;
        this._animating = true;
        this.jump(url, 'APPLICATION:BACKWARD');
    }

    refresh(){
        if ( this._animating ) return;
        this._animating = true;
        this.action = 'REFRESH';
        this.history.replace({
            pathname: this.pathname,
            search: this.search,
            state: {
                index: this._next,
                url: url
            }
        })
    }
}

import { createHashHistory } from 'history';
import { parse, format } from 'url';
import { EventEmitter } from 'events';
import { exto } from '../util';

export default class Http extends EventEmitter {
    constructor(){
        super();
        this._first = true;
        this._prev = 0;
        this._next = 0;
        this.query = {};
        this.params = {};
        this.action = null;
        this._location();
        this._init();
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
        this.history.listen(local => setImmediate(() => this._listen(local)));
    }

    _listen(local){
        this.pathname = local.pathname;
        if ( !local.state && this._first ){
            delete this._first;
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
                local.state = stateData;
                if ( local.action === 'REPLACE' ) this.action = 'REFRESH';
                this._removeByKey(stateData.index, locationKey, () => {
                    this._process(local.state.index, local.search);
                });
            }else{
                this._process(local.state.index, local.search);
            }
        }
    }

    _removeAll(cb){
        let len = window.sessionStorage.length;
        while( len-- ){
            let key = window.sessionStorage.key(len);
            if( key.indexOf('@@History') === 0 ){
                window.sessionStorage.removeItem(key);
            }
        }
        setImmediate(cb);
    }

    _removeByKey(index, localkey, cb){
        let len = window.sessionStorage.length;
        while( len-- ){
            let key = window.sessionStorage.key(len)
            if( key.indexOf('@@History') === 0 ){
                let state = JSON.parse(window.sessionStorage.getItem(key));
                if ( state.index >= index && key != localkey ){
                    window.sessionStorage.removeItem(key);
                }
            }
        }
        setImmediate(cb);
    }

    _process(index, search){
        if ( this._first ){ this._next = index; }
        else{
            if ( this.action !== 'REFRESH' ){
                this._prev = this._next;
                this._next = index;
            }

            if ( !this.action ){
                if ( this._next > this._prev ){ this.action = 'FOWARD'; }
                else if ( this._next < this._prev ){ this.action = 'BACK'; }
                else{ this.action = 'REFRESH'; }
            }
        }

        const searchQuery = parse(search || '', true);
        this.query = exto(searchQuery.query, this.extra);
        this._first && (delete this._first);
        this.emit('http:change', () => {
            this.action = null;
        });
    }

    _go(url, type){
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

    redirect(url){
        this._go(url, 'FOWARD');
    }

    reback(url){
        this._go(url, 'BACK');
    }

    refresh(){
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

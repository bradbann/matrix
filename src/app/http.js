import { createHashHistory } from 'history';
import { parse, format } from 'url';
import { EventEmitter } from 'events';
import { exto } from '../util';

export default class Http extends EventEmitter {
    constructor(){
        super();
        this._first = true;
        this._id = null;
        this._oid =null;
        this._prev = 0;
        this._next = 0;
        this._key = null;
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
        console.log('ccc', !local.state && this._first)
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
            console.log('ddd', local.action)
            if( local.action === 'PUSH' || local.action === 'REPLACE' ){
                const locationKey = '@@History/' + local.key;
                let stateData = JSON.parse(window.sessionStorage.getItem(locationKey));
                stateData.index = history.length;
                window.sessionStorage.setItem(locationKey, JSON.stringify(stateData));
                //local.state = stateData;
                if ( local.action === 'REPLACE' ){
                    this.action = 'REFRESH';
                }
                this._removeByKey(stateData.index, locationKey, () => {
                    this._process(stateData.index, local.search, stateData.id);
                });
            }else{
                this._process(local.state.index, local.search, local.state.id);
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
        cb && setImmediate(cb);
    }

    _removeByKey(index, localkey, cb){
        let len = window.sessionStorage.length;
        let removes = [];
        while( len-- ){
            let key = window.sessionStorage.key(len)
            if( key.indexOf('@@History') === 0 ){
                let state = JSON.parse(window.sessionStorage.getItem(key));
                if ( state.index >= index && key != localkey ){
                    removes.push(state.id);
                    window.sessionStorage.removeItem(key);
                }
            }
        }
        setImmediate(() => {
            if ( removes.length ){
                this.removes = removes;
            }
            cb && cb();
        });
    }

    _process(index, search, id){
        this.id = id;
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
        this.query = exto(searchQuery.query, this.extra);
        this._first && (delete this._first);
        this.emit('http:change', () => {
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
            if ( this.id !== undefined ) delete this.id;
            console.log(this.$app)
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
        this.jump(url, 'APPLICATION:FORWARD');
    }

    reback(url){
        this.jump(url, 'APPLICATION:BACKWARD');
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

    setWebview(id, cb){
        const locationKey = '@@History/' + this._key;
        let stateData = JSON.parse(window.sessionStorage.getItem(locationKey));
        stateData.id = id;
        window.sessionStorage.setItem(locationKey, JSON.stringify(stateData));
        cb && setImmediate(cb);
    }
}

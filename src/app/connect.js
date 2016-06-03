'use strict';

import { EventEmitter } from 'events';
import Layer from './layer';

import { animateForward, animateBackward } from './animate';

let id = 0;

export default class Connect extends EventEmitter {
    constructor(){
        super();
        this.route = '/';
        this.stack = [];
    }

    _route(route, fn, options){
        let handle = fn;
        let path = route;
        const that = this;

        // default route to '/'
        if (typeof route !== 'string') {
            handle = route;
            path = '/';
        }

        // wrap sub-apps
        if ( typeof handle.handle === 'function' ) {
            let server = handle;
            server.route = path;
            Object.defineProperty(server, '$node', { get(){ return that.$node; } });
            Object.defineProperty(server, '$server', { get(){ return that.$server; } });
            Object.defineProperty(server, '$webviews', { get(){ return that.$webviews; } });
            handle = function (next) {
                server.handle(next);
            };
        }

        // strip trailing slash
        if ( path !== '/' && path[path.length - 1] === '/' ) {
            path = path.slice(0, -1);
        }


        // add the middleware
        this.stack.push(new Layer(path, handle, options));

        return this;
    }

    use( route, fn ) {
        return this._route(route, fn, {
            sensitive: false,
            strict: false,
            end: false
        });
    }

    at(route, fn){
        return this._route(route, fn, {
            sensitive: false,
            strict: true,
            end: true
        });
    }

    publish(webview, next){
        const direction = this.$server.action;
        console.log('in',direction)
        switch (direction){
            case 'HISTORY:FORWARD':
                this._historyForward(webview, next);
                break;
            case 'HISTORY:BACKWARD':
                this._historyBackward(webview, next);
                break;
            case 'APPLICATION:FORWARD':
                this._applicationForward(webview, next);
                break;
            case 'APPLICATION:BACKWARD':
                this._applicationBackward(webview, next);
                break;
            case 'REFRESH':
                this._refresh(webview, next);
                break;
            default:
                this._create(webview, newWebview => {
                    newWebview.$node.classList.remove('mx-webview-compiling');
                    newWebview.$node.classList.add('active');
                    next();
                });
        }
    }

    _historyForward(webview, next){
        const _oldWebview = this.$webviews[this.$server._id];
        const _newWebview = this.$webviews[this.$server.id];

        this.$server._oid = this.$server._id;
        this.$server._id = this.$server.id;

        if ( !_newWebview ){
            this._create(webview, newWebview => animateForward(_oldWebview, newWebview, next));
        }else{
            animateForward(_oldWebview, _newWebview, next);
        }
    }

    _historyBackward(webview, next){
        const _oldWebview = this.$webviews[this.$server._id];
        const _newWebview = this.$webviews[this.$server.id];

        this.$server._oid = this.$server._id;
        this.$server._id = this.$server.id;

        if ( !_newWebview ){
            this._create(webview, newWebview => animateBackward(_oldWebview, newWebview, next));
        }else{
            animateBackward(_oldWebview, _newWebview, next);
        }
    }

    _applicationForward(webview, next){
        const _oldWebview = this.$webviews[this.$server._id];
        const _newWebview = this.$webviews[this.$server.id];

        if ( !_newWebview ){
            if ( !_oldWebview ){
                this.$server._oid = null;
                this._create(webview, newWebview => animateForward(_oldWebview, newWebview, next));
            }else{
                this.$server._oid = this.$server._id;
                this._create(webview, newWebview => animateForward(_oldWebview, newWebview, next));
            }
        }else{
            if ( !_oldWebview ){
                this.$server._oid = null;
            }else{
                this.$server._oid = this.$server._id;
            }
            this.$server._id = this.$server.id;
            animateForward(_oldWebview, _newWebview, next);
        }
    }

    _applicationBackward(webview, next){
        const _oldWebview = this.$webviews[this.$server._id];
        const _newWebview = this.$webviews[this.$server.id];

        if ( !_newWebview ){
            if ( !_oldWebview ){
                this.$server._oid = null;
                this._create(webview, newWebview => animateBackward(_oldWebview, newWebview, next));
            }else{
                this.$server._oid = this.$server._id;
                this._create(webview, newWebview => animateBackward(_oldWebview, newWebview, next));
            }
        }else{
            if ( !_oldWebview ){
                this.$server._oid = null;
            }else{
                this.$server._oid = this.$server._id;
            }
            this.$server._id = this.$server.id;
            animateBackward(_oldWebview, _newWebview, next);
        }
    }

    _refresh(webview, next){
        if ( typeof this.$server._id !== 'number' || !this.$webviews[this.$server._id] ){
            this._create(webview, newWebview => {
                newWebview.$node.classList.remove('mx-webview-compiling');
                newWebview.$node.classList.add('active');
                next();
            });
        }else{
            this.$webviews[this.$server._id].refresh && this.$webviews[this.$server._id].refresh();
        }
    }

    _create(webview, next){
        id++;
        const webviewNode = document.createElement('div');
        this.$node.appendChild(webviewNode);
        webviewNode.classList.add('mx-webview');
        const $webview = new webview(webviewNode);
        this.$webviews[id] = $webview;
        $webview.$root = this;
        this.$server._id = id;
        this.$server.setWebview(id, function(){
            $webview._publish(next);
        });
    }

    handle(done){
        let index = 0;
        let stack = this.stack;
        const that = this;

        function next(err){
            const layer = stack[index++];
            if ( !layer ) {
              setImmediate(function(){
                   that.emit('route:end');
                   done();
              }, err);
              return;
            }

            const params = layer.match(that.route);

            if ( !params ){
                return next(err);
            }

            that.compile(layer.handle, params, err, next);
        }

        next();
    }

    compile(handle, params, err, next){
        var arity = handle.length;
        var error = err;
        var hasError = Boolean(err);
        this.$server.params = params;
        try {
            if (hasError && arity === 2) {
              // error-handling middleware
              handle(err, next);
              return;
          } else if (!hasError && arity < 2) {
              // request-handling middleware
              handle(next);
              return;
            }
        } catch (e) {
            // replace the error
            error = e;
        }

        // continue
        next(error);
    }
}

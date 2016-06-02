'use strict';

import { EventEmitter } from 'events';
import Layer from './layer';

import { animateForward } from './animate';

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
        if ( path[path.length - 1] === '/' ) {
            path = path.slice(0, -1);
        }

        if ( !path ) path = '/';

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
                break;
            case 'HISTORY:BACKWARD':
                break;
            case 'APPLICATION:FORWARD':
                this._applicationForward(webview, next);
                break;
            case 'APPLICATION:BACKWARD':
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

    _applicationForward(webview, next){
        const oldWebview = this.$webviews[this.$server._oid];
        if ( typeof this.$server._id !== 'number' || !this.$webviews[this.$server._id] ){
            this._create(webview, newWebview => animateForward(oldWebview, newWebview, next));
        }else{
            animateForward(oldWebview, this.$webviews[this.$server._id], next);
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
            this.$webviews[this.$server._id].refresh();
        }
    }

    _create(webview, next){
        const webviewNode = document.createElement('div');
        this.$node.appendChild(webviewNode);
        webviewNode.classList.add('mx-webview');
        webviewNode.classList.add('mx-webview-compiling');
        const $webview = new webview(webviewNode);
        $webview.$root = this;
        $webview._publish(next);
        this.$server.setWebview(id);
        this.$webviews[id++] = $webview;
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

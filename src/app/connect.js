'use strict';

import { EventEmitter } from 'events';
import Layer from './layer';

export default class Connect extends EventEmitter {
    constructor(){
        super();
        this.route = '/';
        this.stack = [];
    }

    _route(route, fn, options){
        let handle = fn;
        let path = route;

        // default route to '/'
        if (typeof route !== 'string') {
            handle = route;
            path = '/';
        }

        // wrap sub-apps
        if ( typeof handle.handle === 'function' ) {
            let server = handle;
            server.route = path;
            handle = function (next) {
                server.handle(next);
            };
        }

        // strip trailing slash
        if ( path[path.length - 1] === '/' ) {
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

    handle(done){
        let index = 0;
        let stack = this.stack;
        const that = this;

        function next(err){
            const layer = stack[index++];

            if ( !layer ) {
              setImmediate(done, err);
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

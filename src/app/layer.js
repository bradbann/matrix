'use strict';

import PathToRegExp from 'path-to-regexp';

export default class Layer {
    constructor(route, handle, options){
        this.keys = [];
        this.regexp = PathToRegExp(route, this.keys, options || {});
        this.handle = handle;
    }

    match(url){
        this.params = {};
        const matched = this.regexp.exec(url);
        if ( matched ){
            for ( let i = 0 ; i < this.keys.length ; i++ ){
                this.params[this.keys[i].name] = matched[i + 1];
            }
            return this.params;
        }
    }
}

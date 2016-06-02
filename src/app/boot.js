'use strict';

import Http from './http';
import Connect from './connect';

export default class Simplize extends Connect {
    constructor(){
        super();
        this.$server = new Http();
        this.$webviews = {};
        this.$server.$app = this;
    }

    listen(){
        const _app = document.createElement('div');
        _app.classList.add('mx-app');
        document.body.appendChild(_app);
        this.$node = _app;
        this.$server.on('http:change', reset => {
            this.route = this.$server.pathname;
            this.emit('route:start');
            this.handle(reset);
        });
        setImmediate(() => this.emit('ready'));
    }
}

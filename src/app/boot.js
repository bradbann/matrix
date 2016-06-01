'use strict';

import Http from './http';
import Connect from './connect';

import GlobalHTML from '../template/global.html';

export default class Simplize extends Connect {
    constructor(){
        super();
        this.$server = new Http();
    }

    publish(webview){

    }

    listen(){
        const _app = document.createElement('div');
        _app.classList.add('mx-app');
        document.body.appendChild(_app);
        _app.innerHTML = GlobalHTML;
        this.$root = _app;
        this.$server.on('http:change', reset => {
            this.route = this.$server.pathname;
            this.emit('route:end');
            this.handle(reset);
        });
        setImmediate(() => this.emit('ready'));
    }
}

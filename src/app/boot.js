'use strict';

import Http from './http';
import Connect from './connect';

export default class Simplize extends Connect {
    constructor(el){
        super();
        this.$server = new Http();
        this.$webviews = {};
        this.$server.$app = this;
        this.$el = el || document.body;
    }

    listen(){
        const _app = document.createElement('div');
        _app.classList.add('mx-app');
        this.$el.appendChild(_app);
        this.$node = _app;
        this.$server.on('http:change', reset => {
            this.route = this.$server.pathname;
            this.emit('route:start');
            this.handle(() => reset(() => this.emit('route:end')));
        });
        this.on('route:end', () => this.$node.style.backgroundColor = '#222');
        this.emit('ready');
    }
}

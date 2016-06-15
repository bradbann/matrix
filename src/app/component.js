export default class Component {
    constructor(){
        this._isMx = true;
        this._vue_options = {};
    }

    $_extend(property, defaults){
        let key = this['_' + property] || this[property];
        let _key = this._vue_options[property];
        if ( key ){
            const val = key.call(this, _key, (name, value) => {
                if ( typeof this[name] = 'function' ){
                    value = this[name](value);
                }
                return value;
            });
            if ( defaults != undefined && val == undefined ){
                this._vue_options[property] = defaults;
            }else{
                this._vue_options[property] = val;
            }
        }
    }

    $_name(){
        this._vue_options.name = typeof this.name === 'function' ? this.name() : this.name;
    }

    $_data(){
        let data = this._data || this.data;
        let _data = this._vue_options.data;
        if ( data ){
            data = data(_data, (name, value) => {
                if ( typeof this[name] = 'function' ){
                    value = this[name](value);
                }
                return value;
            });

            if ( !data ) return;

            if ( typeof data !== 'function' ){
                this._vue_options.data = function(){
                    return data;
                }
                return;
            }

            this._vue_options.data = data;
        }
    }

    $_props(){
        this.$_extend('props');
    }

    $_computed(){
        this.$_extend('computed', {});
    }

    $_methods(){
        this.$_extend('methods', {});
    }

    $_watch(){
        this.$_extend('watch', {});
    }

    $_template(){
        this.$_extend('template');
    }

    $_replace(){
        this.$_extend('replace');
    }

    $_init(){
        this.$_extend('init');
    }

    $_created(){
        this.$_extend('created');
    }

    $_beforeCompile(){
        this.$_extend('beforeCompile');
    }

    $_compiled(){
        this.$_extend('compiled');
    }

    $_ready(){
        this.$_extend('ready');
    }

    $_attached(){
        this.$_extend('attached');
    }

    $_detached(){
        this.$_extend('detached');
    }

    $_beforeDestroy(){
        this.$_extend('beforeDestroy');
    }

    $_destroyed(){
        this.$_extend('destroyed');
    }

    $_directives(){
        this.$_extend('directives', {});
    }

    $_elementDirectives(){
        this.$_extend('elementDirectives', {});
    }

    $_filters(){
        this.$_extend('filters', {});
    }

    $_components(){
        this.$_extend('components', {});
    }

    $_transitions(){
        this.$_extend('transitions', {});
    }

    $_partials(){
        this.$_extend('partials', {});
    }

    $_parent(){
        this.$_extend('parent');
    }

    $_events(){
        this.$_extend('events', {});
    }

    $_mixins(){
        this.$_extend('mixins', []);
    }

    $_extends(){
        this.$_extend('extends');
    }

    $_install(){
        this.$_data();
        this.$_props();
        this.$_computed();
        this.$_methods();
        this.$_watch();
        this.$_template();
        this.$_replace();
        this.$_init();
        this.$_created();
        this.$_beforeCompile();
        this.$_compiled();
        this.$_ready();
        this.$_attached();
        this.$_detached();
        this.$_beforeDestroy();
        this.$_destroyed();
        this.$_directives();
        this.$_elementDirectives();
        this.$_filters();
        this.$_components();
        this.$_transitions();
        this.$_partials();
        this.$_parent();
        this.$_events();
        this.$_mixins();
        this.$_name();
        this.$_extends();
        return this;
    }
}
